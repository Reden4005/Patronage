import HobbiesDataBase from "../services/HobbiesDataBase";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { hobbieActions } from "./Slices/hobbies-slice";

const ReduxHobbiesService = () => {
  const service = new HobbiesDataBase();
  const dispatch = useDispatch<AppDispatch>();

  service.get().then((data) => {
    setTimeout(() => {
      dispatch(hobbieActions.initializeState(data));
    }, 500);
  });
};

export default ReduxHobbiesService;
