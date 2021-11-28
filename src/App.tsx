import Header from "./components/Header";

import "antd/dist/antd.css";

import UserForm from "./components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { formActions } from "./store/form-slice";
import { AppDispatch } from "./store/store";
import { listActions } from "./store/list-slice";
import { User } from "./types/types";
import TableOfUsers from "./components/TableOfUsers";
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputIsVisible = useSelector((state: RootState) => state.form.visible);
  const onCreate = (values: User) => {
    dispatch(listActions.addNewUser(values));
    dispatch(formActions.toggle());
   
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
      <TableOfUsers />
    </div>
  );
};

export default App;
