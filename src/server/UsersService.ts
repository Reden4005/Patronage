import transformedUsers from "../UI/mapHobbies";
import { User } from "../types/types";
import HOBBIES from "../store/HOBBIES";
import USERS from "../store/USERS";

class UserService {
  constructor() {
    if (localStorage.getItem("currentUsersBase") == null) {
      localStorage.setItem("currentUsersBase", JSON.stringify(transformedUsers));
    }
		if (localStorage.getItem("initialUsersBase") == null) {
      localStorage.setItem("initialUsersBase", JSON.stringify(USERS));
    }

    if (localStorage.getItem("deleteUsers") == null) {
      localStorage.setItem("deletedUsers", JSON.stringify([]));
    }

    if (localStorage.getItem("hobbies") == null) {
      localStorage.setItem("hobbies", JSON.stringify(HOBBIES));
    }
  }

  loadUsers (base: "initial" | "current") {
    const choosenBase = base === "initial" ? "initialUsersBase" : "currentUsersBase";
		let map = new Map();

    JSON.parse(localStorage.getItem("hobbies") as string).forEach((el: {id: string, name: string}) => {
      map.set(el.id, el);
    });

		const rawUsers: User[] = JSON.parse(localStorage.getItem(choosenBase) as string);
    const transformedUsers = rawUsers.map<User>((user) => {
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
		return new Promise((resolve, reject) => resolve(transformedUsers));
	}

  addUserToDataBase(user: User) {
    const actualList = JSON.parse(localStorage.getItem("currentUsersBase") as string);
    actualList.push(user);
    localStorage.setItem("currentUsersBase", JSON.stringify(actualList));
    return new Promise((resolve, reject) => {
      resolve("User saved");
    })
  }

  deleleteUserFromDataBase(id: string) {
    const actualList: User[] = JSON.parse(
      localStorage.getItem("currentUsersBase") as string
    );
    const filtered = actualList.filter((el) => el.id !== id);
    localStorage.setItem("currentUsersBase", JSON.stringify(filtered));
    return new Promise((resolve, reject) => {
      resolve("User deleted")
    })
  }

  initialUsersBase() {
    localStorage.clear();
  }
};

export default UserService;
