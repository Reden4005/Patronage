import UsersDataBase from "../services/UsersDataBase";
import { AppDispatch } from "./store";
import { User } from "../types";
import { listActions } from "./Slices/list-slice";
import { spinnerActions } from "./Slices/spinner-slice";
import { Hobbie } from "../types";

class ReduxUserService {
  private service = new UsersDataBase();

  loadUsers(dispatch: AppDispatch, hobbies: Hobbie[]) {
    let map = new Map();
    hobbies.forEach((el: { id: string; name: string }) => {
      map.set(el.id, el);
    });

    this.service
      .get("currentUsersBase")
      .then((data) => {
        dispatch(spinnerActions.toggle());
        const transformedUsers = data.map<User>((user: User) => {
          let mappedHobbies = [];

          for (let i = 0; i < user.hobbies.length; i++) {
            const hobbiesString = map.get(user.hobbies[i]);
            if (hobbiesString != null) mappedHobbies.push(hobbiesString.name);
          }

          return {
            ...user,
            hobbiesName: mappedHobbies.join(" "),
          };
        });
        setTimeout(() => {
          dispatch(listActions.initializeState(transformedUsers));
          dispatch(spinnerActions.toggle());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  addNewUser(dispatch: AppDispatch, user: User) {
    dispatch(spinnerActions.toggle());
    this.service
      .post(user)
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
    this.service
      .delete(id)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.removeUser(id));
          dispatch(spinnerActions.toggle());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  deleteMultipleUsers(dispatch: AppDispatch, value: User[]) {
    dispatch(spinnerActions.toggle());

    let promises = [];
    for (let i = 0; i < value.length; i++) {
      promises.push(this.service.delete(value[i].id));
    }

    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.removeMultipleUsers(value));
          dispatch(spinnerActions.toggle());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  restoreInitialState(dispatch: AppDispatch) {
    dispatch(spinnerActions.toggle());
    dispatch(listActions.clearState());
    this.service.get("initialUsersBase").then(() => {
      setTimeout(() => {
        dispatch(spinnerActions.toggle());
      }, 1000);
    });
  }

  editUserData(dispatch: AppDispatch, value: User, id: string) {
    dispatch(spinnerActions.toggle());
    this.service.update(value, id).then(() => {
      setTimeout(() => {
        dispatch(listActions.removeUser(id));
        dispatch(listActions.addNewUser(value));
        dispatch(spinnerActions.toggle());
      }, 1000);
    });
  }
}

export default ReduxUserService;
