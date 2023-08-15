import { Request, Response } from 'express';
import NotesModel from '../models/notes.model';
import httpStatus from 'http-status';
import client from '../utils/redis';
import Logger from '../utils/Logger';
import NoteFactory from '../utils/NoteFactory';
const logger = Logger.getInstance();
const noteFactory = new NoteFactory();
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, type } = req.body;
    const userId = req.userId;
    const note = await noteFactory.createNote(type, { title, content, userId });
    await client.del(`user:${userId}:notes`);
    res.status(httpStatus.OK).json(note);
  } catch (error) {
    logger.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while creating the note.' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content, type } = req.body;
    const noteId = req.params.id;
    const userId = req.userId;

    const updatedNote = await noteFactory.updateNote(type, {
      title,
      content,
      type,
      userId,
      noteId,
    });

    if (updatedNote[0] === 0) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Note not found or you do not have access.' });
    } else {
      await client.del(`user:${userId}:notes`);
      await client.del(`note:${noteId}`);
      res.status(httpStatus.OK).json({ message: 'Note updated successfully.' });
    }
  } catch (error) {
    logger.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while updating the note.' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const deletedNote = await NotesModel.destroy({
      where: { id: noteId, userId },
    });

    if (!deletedNote) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Note not found or you do not have access.' });
    } else {
      await client.del(`note:${noteId}`);
      await client.del(`user:${userId}:notes`);
      res.status(httpStatus.OK).json({ message: 'Note deleted successfully.' });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while deleting the note.' });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;

    const cachedNote = await client.get(`note:${noteId}`);
    if (cachedNote) {
      res.json(JSON.parse(cachedNote));
    } else {
      const note = await NotesModel.findOne({
        where: { id: noteId, userId },
      });

      if (!note) {
        res
          .status(httpStatus.NOT_FOUND)
          .json({ error: 'Note not found or you do not have access.' });
      } else {
        await client.set(`note:${noteId}`, JSON.stringify(note));
        res.json(note);
      }
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while fetching the note.' });
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const cachedNotes = await client.get(`user:${userId}:notes`);
    if (cachedNotes) {
      res.json(JSON.parse(cachedNotes));
    } else {
      const notes = await NotesModel.findAll({ where: { userId } });
      await client.set(`user:${userId}:notes`, JSON.stringify(notes));
      res.status(httpStatus.OK).json(notes);
    }
  } catch (error) {
    logger.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while fetching the notes.' });
  }
};
