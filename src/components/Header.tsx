import "antd/dist/antd.css";
import { Button, PageHeader } from "antd";
import { AppDispatch } from "../data/store";
import { useDispatch } from "react-redux";
import { formActions } from "../data/Slices/form-slice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInputHandler = () => {
    dispatch(formActions.toggle());
  };

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title="USERS BASE"
      extra={[
        <Button key="3" onClick={userInputHandler} type="primary">
          Add new user
        </Button>,
        <Button key="2" type="primary">
          Starting setup
        </Button>,
        <Button key="1" type="primary">
          Undo
        </Button>,
      ]}
    ></PageHeader>
  );
};

export default Header;
