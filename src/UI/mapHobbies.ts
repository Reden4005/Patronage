import HOBBIES from "../store/HOBBIES";
import USERS from "../store/USERS";
import { User } from "../types/types";

let map = new Map();

HOBBIES.forEach((el) => {
  map.set(el.id, el);
});

const transformedUsers = USERS.map<User>((user) => {
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

export default transformedUsers;
