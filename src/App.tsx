import Header from "./components/Header";
import "antd/dist/antd.css";
import UserForm from "./components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { formActions } from "./store/form-slice";
import { detailsVisibleActions } from "./store/detailsVisible-slice";
import { User } from "./types/types";
import TableOfUsers from "./components/TableOfUsers";
import DetailsOfUser from "./components/DetailsOfUser";
import EditUser from "./components/EditUser";
import { editActions } from "./store/edit-slice";
import {useEffect } from "react";
import ReduxUserService from "./store/Service";
import PopupDeleteConfirmation from "./UI/PopupDeleteConfirmation";
import { deletedActions } from "./store/delete-slice";

const App: React.FC = () => {
  const reduxUsersservice = new ReduxUserService();
  const dispatch = useDispatch<AppDispatch>();
  const inputIsVisible = useSelector((state: RootState) => state.form.visible);
  const detailsAreVisible = useSelector(
    (state: RootState) => state.details.visible
  );
  const userIdToDelete = useSelector((state: RootState) => state.delete.deletedUser)
  const editVisible = useSelector((state: RootState) => state.edit.visible);
  const deletePopupIsVisible = useSelector((state: RootState) => state.delete.visible);

  const deleteUser = () => {
    reduxUsersservice.deleteUser(dispatch, userIdToDelete!.id);
    dispatch(deletedActions.toggleVisibility());
  }

  const onCreate = (values: User) => {
    reduxUsersservice.addNewUser(dispatch, values);
    dispatch(formActions.toggle());
  };

  useEffect(() => {
    reduxUsersservice.loadUsers(dispatch);
  },[]);

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
        onCancel={() => dispatch(editActions.close())}
        onCreate={() => console.log("create")}
      />
      <PopupDeleteConfirmation visible={deletePopupIsVisible} deleteUser={deleteUser}/>
      <TableOfUsers />
      
    </div>
  );
};

export default App;
