import Header from "./components/Header";
import "antd/dist/antd.css";
import UserForm from "./components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./data/store";
import { formActions } from "./data/Slices/form-slice";
import { detailsVisibleActions } from "./data/Slices/detailsVisible-slice";
import { User } from "./types";
import TableOfUsers from "./components/Table/TableOfUsers";
import DetailsOfUser from "./components/DetailsOfUser";
import EditUser from "./components/EditUser";
import ReduxUserService from "./data/ReduxUserService";
import DeletePopup from "./components/DeletePopup";
import { listActions } from "./data/Slices/list-slice";
import { editActions } from "./data/Slices/edit-slice";
import BulkDeletePopup from "./components/BulkDeletePopup";
import { bulkDeleteActions } from "./data/Slices/bulkDelete-slice";
import InitialStatePopup from "./components/InitialStatePopup";
import { initialStateActions } from "./data/Slices/initialState-slice";
import ReduxHobbiesService from "./data/ReduxHobbiesService";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxUsersService = new ReduxUserService();
  const initializeBase = useSelector(
    (state: RootState) => state.listOfUsers.usersLists
  );
  const hobbies = useSelector((state: RootState) => state.hobbies.hobbies);
  const initializeHobbies = useSelector(
    (state: RootState) => state.hobbies.hobbies
  );
  const inputIsVisible = useSelector((state: RootState) => state.form.visible);
  const detailsAreVisible = useSelector(
    (state: RootState) => state.details.visible
  );
  const bulkDeletePopupVisible = useSelector(
    (state: RootState) => state.listOfUsers.confirmBulkDeleteIsVisible
  );
  const userToDelete = useSelector(
    (state: RootState) => state.listOfUsers.userToDelete
  );
  const deletedUsers = useSelector(
    (state: RootState) => state.listOfUsers.usersToDelete
  );
  const editVisible = useSelector((state: RootState) => state.edit.visible);
  const deletePopupIsVisible = useSelector(
    (state: RootState) => state.listOfUsers.confirmDeleteIsVisible
  );
  const editedUserId = useSelector((state: RootState) => state.edit.edit?.id);
  const initialStateIsVisible = useSelector(
    (state: RootState) => state.initialState.visible
  );

  const deleteUser = () => {
    reduxUsersService.deleteUser(dispatch, userToDelete!.id);
    dispatch(listActions.toggleConfirmDelete(userToDelete));
    dispatch(listActions.deleteConfirmed(userToDelete));
  };

  const onCreate = (values: User) => {
    reduxUsersService.addNewUser(dispatch, values);
    dispatch(formActions.toggle());
  };

  const onEdit = (values: User) => {
    const editedUser: User = { ...values, id: editedUserId as string };
    reduxUsersService.editUserData(
      dispatch,
      editedUser,
      editedUserId as string
    );
    dispatch(editActions.close());
  };

  const deleteUsers = () => {
    dispatch(listActions.bulkDeleteIsVisible());
    dispatch(bulkDeleteActions.clear());
    dispatch(listActions.removeMultipleUsers(deletedUsers));
    reduxUsersService.deleteMultipleUsers(dispatch, deletedUsers as User[]);
  };

  const restoreInitialState = () => {
    reduxUsersService.restoreInitialState(dispatch);
    dispatch(initialStateActions.toggle());
  };
  if (initializeHobbies.length === 0) {
    ReduxHobbiesService();
  }
  if (initializeBase.length === 0) {
    reduxUsersService.loadUsers(dispatch, hobbies);
  }

  return (
    <div>
      <Header />
      <UserForm
        visible={inputIsVisible}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(formActions.toggle());
        }}
      />
      <DetailsOfUser
        visible={detailsAreVisible}
        onOk={() => {
          dispatch(detailsVisibleActions.close());
        }}
      />
      <EditUser visible={editVisible} onCreate={onEdit} />
      <DeletePopup visible={deletePopupIsVisible} deleteUser={deleteUser} />
      <BulkDeletePopup visible={bulkDeletePopupVisible} onOk={deleteUsers} />
      <InitialStatePopup
        visible={initialStateIsVisible}
        restoreInitialState={restoreInitialState}
      />
      <TableOfUsers />
    </div>
  );
};

export default App;
