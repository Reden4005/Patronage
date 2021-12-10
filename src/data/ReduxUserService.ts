import UsersDataBase from "../services/UsersDataBase";
import { AppDispatch } from "./store";
import { User } from "../types";
import { listActions } from "./Slices/list-slice";
import { Hobbie } from "../types";
import { spinnerActions } from "./Slices/spinner-slice";
import { bulkDeleteActions } from "./Slices/bulkDelete-slice";

class ReduxUserService {
  private service = new UsersDataBase();

  loadUsers(dispatch: AppDispatch, hobbies: Hobbie[]) {
    let map = new Map();
    hobbies.forEach((el: { id: string; name: string }) => {
      map.set(el.id, el);
    });

    this.service
      .get("currentUsersBase")
      .then(data => {
        dispatch(spinnerActions.spinnerOn());
        const transformedUsers = data.map<User>((user: any) => {
          let mappedHobbies = [];
          if (user.hobbies) {
            for (let i = 0; i < user.hobbies.length; i++) {
              const hobbiesString = map.get(user.hobbies[i]);
              if (hobbiesString != null) mappedHobbies.push(hobbiesString.name);
            }
            return {
              ...user,
              hobbiesName: mappedHobbies,
            };
          } else
            return {
              ...user,
            };
        });
        setTimeout(() => {
          dispatch(spinnerActions.spinnerOff());
          dispatch(listActions.initializeState(transformedUsers));
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  addNewUser(dispatch: AppDispatch, user: User) {
    this.service
      .post(user)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.addNewUser(user));
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  deleteUser(dispatch: AppDispatch, id: string) {
    this.service
      .delete(id)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.removeUser(id));
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  deleteMultipleUsers(dispatch: AppDispatch, value: User[]) {
    let promises = [];
    for (let i = 0; i < value.length; i++) {
      promises.push(this.service.delete(value[i].id));
    }

    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.removeMultipleUsers(value));
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  addNewUsers(dispatch: AppDispatch, users: User[]) {
    let promises = [];
    for (let i = 0; i < users.length; i++) {
      promises.push(this.service.post(users[i]));
    }

    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          dispatch(listActions.addNewUsers(users));
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  restoreInitialState(dispatch: AppDispatch) {
    dispatch(listActions.clearState());
    dispatch(bulkDeleteActions.clear());
    this.service.get("initialUsersBase").then(() => {
      setTimeout(() => {}, 1000);
    });
  }

  editUserData(dispatch: AppDispatch, value: User, id: string) {
    this.service.update(value, id).then(() => {
      setTimeout(() => {
        dispatch(listActions.removeUser(id));
        dispatch(listActions.addNewUser(value));
      }, 1000);
    });
  }
}

export default ReduxUserService;
