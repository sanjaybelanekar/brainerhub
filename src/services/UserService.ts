import { AxiosResponse } from "axios";
import "../api/index";
import { API, endPoints } from "../api/index";
import User from "../shared/models/userModel";

class UserService {
  static createUser(user: FormData | User): Promise<AxiosResponse> {
    return API.post(endPoints.api.users.create, user);
  } //createUser

  static updateUser(id: string, user: FormData | User): Promise<AxiosResponse> {
    return API.put(endPoints.api.users.update + id, user);
  } //updateUser

  static deleteUser(id: string): Promise<AxiosResponse> {
    return API.delete(endPoints.api.users.delete + id);
  } //deleteUser

  static fetchOneUser(id: string): Promise<AxiosResponse> {
    return API.get(endPoints.api.users.getOne + id);
  } //fetchOneUser

  static fetchAllUsers(query: string): Promise<AxiosResponse> {
    return API.get(endPoints.api.users.getAll + query);
  } //fetchAllUsers
}
export default UserService;
