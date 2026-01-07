import { UserModel } from "./user-model";

export interface AuthContextModel {
  user: UserModel | null;
    setUser: (user: UserModel | null) => void;
}