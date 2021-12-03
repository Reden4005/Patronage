import { Table } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import Columns from "./Columns";
import RowSelection from "./RowSelection";

const TableOfUsers: React.FC = () => {
  const actualListOfUsers = useSelector(
    (state: RootState) => state.listOfUsers.usersLists
  );
  const loading = useSelector((state: RootState) => state.spinner.visible);

  return (
    <>
      <Table
        columns={Columns()}
        dataSource={actualListOfUsers}
        rowKey="id"
        rowSelection={{
          type: "checkbox",
          ...RowSelection(),
        }}
        loading={loading}
        bordered
      />
    </>
  );
};

export default TableOfUsers;
