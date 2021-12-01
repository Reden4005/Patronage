import "antd/dist/antd.css";
import { Button } from "antd";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { formActions } from "../store/form-slice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInputHandler = () => {
    dispatch(formActions.toggle());
  };
  return (
    <div className="header">
      <h1>USERS BASE</h1>
      <div className="buttons">
        <Button onClick={userInputHandler}>Add new user</Button>
        <Button>Starting setup</Button>
        <Button>Undo</Button>
      </div>
    </div>
  );
};

export default Header;
