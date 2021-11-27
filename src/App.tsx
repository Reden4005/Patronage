import Header from "./components/Header";
import { Table } from "antd";
import "antd/dist/antd.css";
import { columns } from "./components/Table";
import UserForm from "./components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { formActions } from "./store/form-slice";
import { AppDispatch } from "./store/store";
import { listActions } from "./store/list-slice";
import { User } from "./types/types";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputIsVisible = useSelector((state: RootState) => state.form.visible);
  const actualListOfUsers = useSelector((state: RootState) => state.listOfUsers.initialUsersLists)
  const onCreate = (values: User) => { console.log(values)
    dispatch(listActions.addNewUser(values));
    dispatch(formActions.toggle());
   
  }

  return (
    <div>
      <Header />
      <Table
        dataSource={actualListOfUsers}
        columns={columns}
        rowKey="id"
        bordered
      />
      <UserForm
        visible={inputIsVisible}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(formActions.toggle());
        }}
      />
    </div>
  );
};

export default App;
