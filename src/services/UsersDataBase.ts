import { User } from "../types";
import USERS from "./USERS";

class UsersDataBase {
  static readonly USERBASE_KEY = "currentUsersBase";
  constructor() {
    if (localStorage.getItem(UsersDataBase.USERBASE_KEY) == null) {
      localStorage.setItem(UsersDataBase.USERBASE_KEY, JSON.stringify(USERS));
    }
    if (localStorage.getItem("initialUsersBase") == null) {
      localStorage.setItem("initialUsersBase", JSON.stringify(USERS));
    }

    if (localStorage.getItem("deleteUsers") == null) {
      localStorage.setItem("deletedUsers", JSON.stringify([]));
    }
  }

  get(base: "initialUsersBase" | "currentUsersBase") {
    const users: User[] = JSON.parse(localStorage.getItem(base) as string);

    if (base === "initialUsersBase") {
      localStorage.setItem(UsersDataBase.USERBASE_KEY, JSON.stringify(users));
    }
    return new Promise<User[]>((resolve, reject) => resolve(users));
  }

  post(user: User) {
    const actualList = JSON.parse(
      localStorage.getItem(UsersDataBase.USERBASE_KEY) as string
    );
    actualList.push(user);
    localStorage.setItem(
      UsersDataBase.USERBASE_KEY,
      JSON.stringify(actualList)
    );
    return new Promise((resolve, reject) => {
      resolve("User saved");
    });
  }

  delete(id: string) {
    const actualList: User[] = JSON.parse(
      localStorage.getItem(UsersDataBase.USERBASE_KEY) as string
    );
    const filtered = actualList.filter((el) => el.id !== id);
    localStorage.setItem(UsersDataBase.USERBASE_KEY, JSON.stringify(filtered));
    return new Promise((resolve, reject) => {
      resolve("User deleted");
    });
  }

  update(values: User, id: string) {
    const actualList: User[] = JSON.parse(
      localStorage.getItem(UsersDataBase.USERBASE_KEY) as string
    );
    const filtered = actualList.filter((el) => el.id !== id);
    filtered.push({ ...values, id: id });
    localStorage.setItem(UsersDataBase.USERBASE_KEY, JSON.stringify(filtered));
    return new Promise((resolve, reject) => {
      resolve("User's data changed");
    });
  }
}

export default UsersDataBase;
