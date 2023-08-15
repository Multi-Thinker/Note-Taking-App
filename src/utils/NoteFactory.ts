import { ImageNote, TextNote } from '../models/notes.model';

class NoteFactory {
  createNote(type: 'text' | 'image', data: any) {
    switch (type) {
      case 'text':
        const textNoteSave = new TextNote(data);
        return textNoteSave.save(data);
      case 'image':
        const imageNoteSave = new ImageNote(data);
        return imageNoteSave.save(data);
      default:
        throw new Error(`Unsupported note type: ${type}`);
    }
  }
  updateNote(type: 'text' | 'image', data: any) {
    switch (type) {
      case 'text':
        const textNoteSave = new TextNote(data);
        return textNoteSave.update(data);
      case 'image':
        const imageNoteSave = new ImageNote(data);
        return imageNoteSave.update(data);
      default:
        throw new Error(`Unsupported note type: ${type}`);
    }
  }
}

export default NoteFactory;
