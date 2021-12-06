import HOBBIES from "./HOBBIES";
import { Hobbie } from "../types";

class HobbiesDataBase {
  constructor() {
    if (localStorage.getItem("hobbies") == null) {
      localStorage.setItem("hobbies", JSON.stringify(HOBBIES));
    }
  }

  get() {
    const hobbiesList: Hobbie[] = JSON.parse(
      localStorage.getItem("hobbies") as string
    );
    return new Promise<Hobbie[]>((resolve, reject) => {
      resolve(hobbiesList);
    });
  }
}

export default HobbiesDataBase;
