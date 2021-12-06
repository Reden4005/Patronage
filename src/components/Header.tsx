import "antd/dist/antd.css";
import { Button, PageHeader } from "antd";
import { AppDispatch, RootState } from "../data/store";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../data/Slices/form-slice";
import { listActions } from "../data/Slices/list-slice";
import { initialStateActions } from "../data/Slices/initialState-slice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInputHandler = () => {
    dispatch(formActions.toggle());
  };

  const bulkDeleteHandler = () => {
    dispatch(listActions.bulkDeleteIsVisible());
  };

  const selectedRowKeys = useSelector(
    (state: RootState) => state.bulkDeleteKeys.keys
  );

  const deletedUsersApear = useSelector(
    (state: RootState) => state.listOfUsers.deletedUsers
  );

  const initialStateHandler = () => {
    dispatch(initialStateActions.toggle());
  }

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title="USERS BASE"
      style={{ width: "98%" }}
      extra={[
        <Button key="4" onClick={userInputHandler} type="primary">
          Add new user
        </Button>,
        <Button
          key="2"
          type="primary"
          onClick={bulkDeleteHandler}
          disabled={selectedRowKeys.length === 0}
        >
          Bulk delete
        </Button>,
        <Button key="3" type="primary" onClick={initialStateHandler}>
          Initial state
        </Button>,
        <Button
          key="1"
          type="primary"
          disabled={deletedUsersApear.length === 0}
        >
          Undo
        </Button>,
      ]}
    ></PageHeader>
  );
};

export default Header;
