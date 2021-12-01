import UserService from "../server/UsersService";
import { AppDispatch } from "../store/store";
import { User } from "../types/types";
import { listActions } from "./list-slice";
import { spinnerActions } from "./spinner-slice";

class ReduxUserService {
  private service = new UserService();

  loadUsers(dispatch: AppDispatch) {
    this.service
      .loadUsers("current")
      .then((data) => {
        dispatch(spinnerActions.toggle());
        setTimeout(() => {
          dispatch(listActions.initializeState(data));
          dispatch(spinnerActions.toggle());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  addNewUser(dispatch: AppDispatch, user: User) {
    dispatch(spinnerActions.toggle());
    this.service
      .addUserToDataBase(user)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.addNewUser(user));
          dispatch(spinnerActions.toggle());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  deleteUser(dispatch: AppDispatch, id: string) {
    dispatch(spinnerActions.toggle());
    this.service.deleleteUserFromDataBase(id)
    .then(() => {
      setTimeout(() => {
        dispatch(listActions.removeUser(id));
        dispatch(spinnerActions.toggle())
      }, 1000) 
    })
    .catch(err => console.log(err))
  }
}

export default ReduxUserService;
