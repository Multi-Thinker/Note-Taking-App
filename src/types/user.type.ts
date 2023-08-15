import { Model } from 'sequelize';

interface UserType {
  id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserInstance extends Model<UserType>, UserType {}
export default UserInstance;
