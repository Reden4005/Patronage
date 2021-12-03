import { useDispatch } from "react-redux";
import { User } from "../../types";
import { AppDispatch } from "../../data/store";
import { listActions } from "../../data/Slices/list-slice";

const RowSelection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
      dispatch(listActions.bulkDeleteData(selectedRows));
    },
    getCheckboxProps: (record: User) => ({
      disabled: record.id === "Disabled User",
      name: record.id,
    }),
  };
  return rowSelection;
};

export default RowSelection;
