import UsersDataBase from "../services/UsersDataBase";
import { AppDispatch } from "./store";
import { User } from "../types";
import { listActions } from "./Slices/list-slice";
import { spinnerActions } from "./Slices/spinner-slice";

class ReduxUserService {
  private service = new UsersDataBase();

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

  deleteMultipleUsers(dispatch: AppDispatch, value: User[]) {
    dispatch(spinnerActions.toggle());
    this.service
      .deleteMultipleUsersFromdataBase(value)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.removeMultipleUsers(value));
          dispatch(spinnerActions.toggle());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }
}

export default ReduxUserService;
