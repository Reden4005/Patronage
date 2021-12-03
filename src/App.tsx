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
import {useEffect } from "react";
import ReduxUserService from "./data/ReduxUserService";
import PopupDeleteConfirmation from "./components/PopupDeleteConfirmation";
import { listActions } from "./data/Slices/list-slice";

const App: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const reduxUsersService = new ReduxUserService();
  const inputIsVisible = useSelector((state: RootState) => state.form.visible);
  const detailsAreVisible = useSelector(
    (state: RootState) => state.details.visible
  );

  const userToDelete = useSelector((state: RootState) => state.listOfUsers.userToDelete);
  const editVisible = useSelector((state: RootState) => state.edit.visible);
  const deletePopupIsVisible = useSelector((state: RootState) => state.listOfUsers.confirmDeleteIsVisible);

  const deleteUser = () => {
    reduxUsersService.deleteUser(dispatch, userToDelete!.id);
    dispatch(listActions.toggleConfirmDelete(userToDelete));
    dispatch(listActions.deleteConfirmed(userToDelete));
  }

  const onCreate = (values: User) => {
    reduxUsersService.addNewUser(dispatch, values);
    dispatch(formActions.toggle());
  };

  useEffect(() => {
    reduxUsersService.loadUsers(dispatch);
  }, []);

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
      <EditUser
        visible={editVisible}
        onCreate={() => console.log("create")}
      />
      <PopupDeleteConfirmation visible={deletePopupIsVisible} deleteUser={deleteUser}/>
      <TableOfUsers />
    </div>
  );
};

export default App;
