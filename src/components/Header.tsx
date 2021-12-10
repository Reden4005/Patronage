import "antd/dist/antd.css";
import { Button, PageHeader } from "antd";
import { AppDispatch, RootState } from "../data/store";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../data/Slices/form-slice";
import { listActions } from "../data/Slices/list-slice";
import { initialStateActions } from "../data/Slices/initialState-slice";
import { undoActions } from "../data/Slices/undo-slice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userInputHandler = () => {
    dispatch(formActions.formOn());
  };

  const bulkDeleteHandler = () => {
    dispatch(listActions.bulkDeleteIsVisible());
  };

  const selectedRowKeys = useSelector(
    (state: RootState) => state.bulkDeleteKeys.keys
  );

  const deletedUsersApear = useSelector(
    (state: RootState) => state.undo.deletedUsers
  );

  const initialStateHandler = () => {
    dispatch(initialStateActions.toggle());
    navigate("/");
  };

  const undoIsVisible = () => {
    dispatch(undoActions.undoIsVisible());
    navigate("/");
  };

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title="USERS BASE"
      style={{ width: "98%" }}
      extra={[
        <Link key="addNewUser" to="/add-user">
          <Button key="4" onClick={userInputHandler} type="primary">
            Add new user
          </Button>
        </Link>,
        <Link key="bulkDelete" to="/bulk-delete">
          <Button
            key="3"
            type="primary"
            onClick={bulkDeleteHandler}
            disabled={selectedRowKeys.length === 0}>
            Bulk delete
          </Button>
        </Link>,
        <Link key="initial-state" to="/initial-state">
          <Button key="2" type="primary" onClick={initialStateHandler}>
            Initial state
          </Button>
        </Link>,
        <Link key="undo" to="/undo">
          <Button
            key="1"
            type="primary"
            disabled={deletedUsersApear.length === 0}
            onClick={undoIsVisible}>
            Undo
          </Button>
        </Link>,
      ]}></PageHeader>
  );
};

export default Header;
