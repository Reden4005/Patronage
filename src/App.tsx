import "antd/dist/antd.css";
import UserForm from "./views/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./data/store";
import { formActions } from "./data/Slices/form-slice";
import { detailsVisibleActions } from "./data/Slices/detailsVisible-slice";
import { User } from "./types";
import DetailsOfUser from "./views/DetailsOfUser";
import EditUser from "./views/EditUser";
import ReduxUserService from "./data/ReduxUserService";
import DeletePopup from "./views/DeletePopup";
import { listActions } from "./data/Slices/list-slice";
import { editActions } from "./data/Slices/edit-slice";
import BulkDeletePopup from "./views/BulkDeletePopup";
import { bulkDeleteActions } from "./data/Slices/bulkDelete-slice";
import InitialStatePopup from "./views/InitialStatePopup";
import { initialStateActions } from "./data/Slices/initialState-slice";
import ReduxHobbiesService from "./data/ReduxHobbiesService";
import { undoActions } from "./data/Slices/undo-slice";
import UndoPopup from "./views/UndoPopup";
import ReduxDeletedUserService from "./data/ReduxDeletedUsersService";
import { buttonsActions } from "./data/Slices/buttons-slice";
import { Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxUsersService = new ReduxUserService();
  const reduxDeletedUsersService = new ReduxDeletedUserService();
  const hobbies = useSelector((state: RootState) => state.hobbies.hobbies);
  let navigate = useNavigate();
  const initializeBase = useSelector(
    (state: RootState) => state.listOfUsers.usersLists
  );
  const initializeHobbies = useSelector(
    (state: RootState) => state.hobbies.hobbies
  );
  const initialDeletedUsers = useSelector(
    (state: RootState) => state.undo.deletedUsers
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

  const undoIsVisible = useSelector(
    (state: RootState) => state.undo.undoIsVisible
  );

  const usersToRecover = useSelector(
    (state: RootState) => state.undo.usersToRecover
  );

  const deleteUser = () => {
    reduxUsersService.deleteUser(dispatch, userToDelete!.id);
    dispatch(listActions.toggleConfirmDelete(userToDelete));
    reduxDeletedUsersService.addDeletedUser(dispatch, userToDelete as User);
    navigate("/");
  };

  const onCreate = (values: User) => {
    reduxUsersService.addNewUser(dispatch, values);
    dispatch(formActions.formOff());
  };

  const onEdit = (values: User) => {
    const editedUser: User = { ...values, id: editedUserId as string };
    reduxUsersService.editUserData(
      dispatch,
      editedUser,
      editedUserId as string
    );
    dispatch(editActions.close());
    navigate("/");
  };

  const deleteUsers = () => {
    dispatch(listActions.bulkDeleteIsVisible());
    dispatch(bulkDeleteActions.clear());
    dispatch(listActions.removeMultipleUsers(deletedUsers));
    dispatch(undoActions.deleteUsers(deletedUsers));
    reduxUsersService.deleteMultipleUsers(dispatch, deletedUsers as User[]);
    reduxDeletedUsersService.addMultipleDeletedUsers(
      dispatch,
      deletedUsers as User[]
    );
    navigate("/");
  };

  const undoUsers = () => {
    reduxUsersService.addNewUsers(dispatch, usersToRecover);
    reduxDeletedUsersService.removeMultipleDeletedUsers(
      dispatch,
      usersToRecover
    );
    dispatch(undoActions.clearStateUsersToRecover());
    dispatch(undoActions.undoIsVisible());
    dispatch(buttonsActions.buttonsClear());
    dispatch(bulkDeleteActions.clear());
    navigate("/");
  };

  if (initializeBase.length === 0 && initialDeletedUsers.length === 0) {
    reduxUsersService.loadUsers(dispatch, hobbies);
    reduxDeletedUsersService.loadDeletedUsers(dispatch);
  }

  const restoreInitialState = () => {
    reduxUsersService.restoreInitialState(dispatch);
    reduxDeletedUsersService.clearDeletedUsersDataBase(dispatch);
    dispatch(initialStateActions.toggle());
    navigate("/");
  };

  if (initializeHobbies.length === 0) {
    ReduxHobbiesService();
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/add-user"
          element={
            <UserForm
              visible={inputIsVisible}
              onCreate={onCreate}
              onCancel={() => {
                dispatch(formActions.formOff());
                navigate("/");
              }}
            />
          }
        />
        <Route
          path="/user-details/:userId"
          element={
            <DetailsOfUser
              visible={detailsAreVisible}
              onOk={() => {
                dispatch(detailsVisibleActions.close());
                navigate("/");
              }}
            />
          }
        />
        <Route
          path="edit-user/:userId"
          element={<EditUser visible={editVisible} onCreate={onEdit} />}
        />
        <Route
          path="delete-user/:userId"
          element={
            <DeletePopup
              visible={deletePopupIsVisible}
              deleteUser={deleteUser}
            />
          }
        />
        <Route
          path="bulk-delete"
          element={
            <BulkDeletePopup
              visible={bulkDeletePopupVisible}
              onOk={deleteUsers}
            />
          }
        />
        <Route
          path="initial-state"
          element={
            <InitialStatePopup
              visible={initialStateIsVisible}
              restoreInitialState={restoreInitialState}
            />
          }
        />
        <Route
          path="undo"
          element={<UndoPopup visible={undoIsVisible} onOk={undoUsers} />}
        />
      </Routes>
    </div>
  );
};

export default App;
