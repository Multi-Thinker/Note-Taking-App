import request from 'supertest';
import app from '../src/app';
import httpStatus from 'http-status';

describe('Notes', () => {
  let noteId: string;
  let userToken: string;
  let server: any;
  beforeAll(async () => {
    noteId = '3b2a04db-2065-4d28-88bf-aa833f0d5d16';
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it('user can login with valid credentials', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username: 'user1', password: 'password1' });
    userToken = (response as any).body.token;
    expect(userToken).toBeTruthy();
    expect(response.status).toBe(httpStatus.OK);
  });

  it('should get a note by ID', async () => {
    const response = await request(app)
      .get(`/notes/${noteId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.title).toBe('Note Title 2');
    expect(response.status).toBe(200);
  });

  it('should get a 404 by wrong note ID', async () => {
    const response = await request(app)
      .get(`/notes/${noteId}1`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(404);
  });

  it('can create a new note', async () => {
    const response = await request(app)
      .post(`/notes/`)
      .send({ title: 'new', content: 'new', type: 'text' })
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.title).toBe('new');
    expect(response.body.noteType).toBe('text');
  });

  it('can delete a note', async () => {
    const response = await request(app)
      .delete(`/notes/${noteId}`)
      .set('Authorization', `Bearer ${userToken}`);
    const list = await request(app)
      .get(`/notes/`)
      .set('Authorization', `Bearer ${userToken}`);
    const oldNote = await request(app)
      .get(`/notes/${noteId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(list.body.length).toBe(2); // whats left
    expect(response.status).toBe(httpStatus.OK);
    expect(oldNote.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.message).toBe('Note deleted successfully.');
  });

  it('can update a note', async () => {
    const secondNote = 'a2eb515c-9f45-4db2-8790-bb06f101b54a';
    const response = await request(app)
      .put(`/notes/${secondNote}`)
      .send({ title: 'meow', content: 'meow', type: 'image' })
      .set('Authorization', `Bearer ${userToken}`);
    const refetchUpdatedNote = await request(app)
      .get(`/notes/${secondNote}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Note updated successfully.');
    expect(refetchUpdatedNote.body.noteType).toBe('image');
    expect(refetchUpdatedNote.body.title).toBe('meow');
  });
});
