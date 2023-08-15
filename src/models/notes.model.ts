import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import UserModel from './user.model';
import NoteInstance from '../types/notes.type';

const NotesModel = sequelize.define<NoteInstance>(
  'Note',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noteType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'text',
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true },
);

UserModel.hasMany(NotesModel, { as: 'notes', foreignKey: 'userId' });
NotesModel.belongsTo(UserModel, { foreignKey: 'userId' });

abstract class Note {
  abstract save(props): void;
  abstract update(props): void;
}

export class TextNote extends Note {
  constructor(private data: any) {
    super();
  }

  async save(props) {
    return await NotesModel.create({ ...props });
  }
  async update(props) {
    const { title, content, type, userId, noteId } = props;
    const updatedNote = await NotesModel.update(
      { title, content, noteType: type },
      { where: { id: noteId, userId } },
    );
    return updatedNote;
  }
}

export class ImageNote extends Note {
  constructor(private data: any) {
    super();
  }

  async save(props) {
    return await NotesModel.create({ ...props });
  }
  async update(props) {
    const { title, content, type, userId, noteId } = props;
    const updatedNote = await NotesModel.update(
      { title, content, noteType: type },
      { where: { id: noteId, userId } },
    );
    return updatedNote;
  }
}

export default NotesModel;
