interface Name {
  first?: string;
  last?: string;
}

interface UserModel {
  _id?: string;
  userId?: number;
  name?: Name;
  email?: string;
  password?: string;
}

export default UserModel;
