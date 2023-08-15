import { Model } from 'sequelize';

interface NoteType {
  id?: string;
  title: string;
  content: string;
  noteType?: 'text' | 'image';
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface NoteInstance extends Model<NoteType>, NoteType {}

export default NoteInstance;
