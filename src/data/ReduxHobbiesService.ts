import HobbiesDataBase from "../services/HobbiesDataBase";
import { AppDispatch } from "./store";
import { spinnerActions } from "./Slices/spinner-slice";
import { useDispatch } from "react-redux";
import { hobbieActions } from "./Slices/hobbies-slice";

const ReduxHobbiesService = () => {
  const service = new HobbiesDataBase();
  const dispatch = useDispatch<AppDispatch>();

  dispatch(spinnerActions.toggle());

  service.get().then((data) => {
    setTimeout(() => {
      dispatch(spinnerActions.toggle());
      dispatch(hobbieActions.initializeState(data));
    }, 500);
  });
};

export default ReduxHobbiesService;
