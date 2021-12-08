import DeletedUsersDataBase from "../services/DeletedUsersDataBase";
import { AppDispatch } from "./store";
import { User } from "../types";
import { spinnerActions } from "./Slices/spinner-slice";
import { undoActions } from "./Slices/undo-slice";

class ReduxDeletedUserService {
  private deletedUsersService = new DeletedUsersDataBase();

  loadDeletedUsers(dispatch: AppDispatch) {
    this.deletedUsersService
      .get()
      .then((data) => {
        setTimeout(() => {
          dispatch(undoActions.initializeState(data));
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  addDeletedUser(dispatch: AppDispatch, user: User) {
    dispatch(spinnerActions.spinnerOn());
    this.deletedUsersService
      .post(user)
      .then(() => {
        setTimeout(() => {
          dispatch(undoActions.deleteUser(user));
          dispatch(spinnerActions.spinnerOff());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  removeDeleteUser = (dispatch: AppDispatch, id: string) => {
    dispatch(spinnerActions.spinnerOn());
    this.deletedUsersService
      .delete(id)
      .then(() => {
        setTimeout(() => {
          dispatch(undoActions.removeDeletedUser(id));
          dispatch(spinnerActions.spinnerOff());
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  addMultipleDeletedUsers(dispatch: AppDispatch, value: User[]) {
    dispatch(spinnerActions.spinnerOn());

    let promises = [];
    for (let i = 0; i < value.length; i++) {
      promises.push(this.deletedUsersService.post(value[i]));
    }

    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          dispatch(spinnerActions.spinnerOff());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  removeMultipleDeletedUsers(dispatch: AppDispatch, users: User[]) {
    dispatch(spinnerActions.spinnerOn());
    let promises = [];
    for (let i = 0; i < users.length; i++) {
      promises.push(this.deletedUsersService.delete(users[i].id));
    }

    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          dispatch(undoActions.removeMultipleDeletedUsers(users));
          dispatch(spinnerActions.spinnerOff());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

	clearDeletedUsersDataBase(dispatch: AppDispatch) {
    this.deletedUsersService
      .update()
      .then(() => {
        setTimeout(() => {
					dispatch(undoActions.clearStateUsersToRecover());
          dispatch(undoActions.clearState());
          dispatch(spinnerActions.spinnerOff());
        }, 1000);
      })
      .catch((err) => console.log(err));
	}
}

export default ReduxDeletedUserService;
