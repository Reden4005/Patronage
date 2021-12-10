import { User } from "../types";

class DeletedUsersDataBase {
  static readonly USERBASE_KEY = "deletedUsers";
  constructor() {
    if (localStorage.getItem(DeletedUsersDataBase.USERBASE_KEY) == null) {
      localStorage.setItem(
        DeletedUsersDataBase.USERBASE_KEY,
        JSON.stringify([])
      );
    }
  }

  get() {
    const deletedUsers: User[] = JSON.parse(
      localStorage.getItem(DeletedUsersDataBase.USERBASE_KEY) as string
    );
    return new Promise<User[]>((resolve, reject) => resolve(deletedUsers));
  }

  post(user: User) {
    const deletedList = JSON.parse(
      localStorage.getItem(DeletedUsersDataBase.USERBASE_KEY) as string
    );
    deletedList.push(user);
    localStorage.setItem(
      DeletedUsersDataBase.USERBASE_KEY,
      JSON.stringify(deletedList)
    );
    return new Promise((resolve, reject) => {
      resolve("Deleted user saved");
    });
  }

  delete(id: string) {
    const deletedList: User[] = JSON.parse(
      localStorage.getItem(DeletedUsersDataBase.USERBASE_KEY) as string
    );
    const filtered = deletedList.filter(el => el.id !== id);
    localStorage.setItem(
      DeletedUsersDataBase.USERBASE_KEY,
      JSON.stringify(filtered)
    );
    return new Promise((resolve, reject) => {
      resolve("User recover");
    });
  }

  update() {
    localStorage.setItem(DeletedUsersDataBase.USERBASE_KEY, JSON.stringify([]));
    return new Promise((resolve, reject) => {
      resolve("Deleted user clear");
    });
  }
}

export default DeletedUsersDataBase;
