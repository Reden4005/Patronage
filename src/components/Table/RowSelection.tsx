import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types";
import { AppDispatch, RootState } from "../../data/store";
import { listActions } from "../../data/Slices/list-slice";
import React, { useState } from "react";
import { bulkDeleteActions } from "../../data/Slices/bulkDelete-slice";

const RowSelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState([] as User[]);

  const selectedRowKeys = useSelector(
    (state: RootState) => state.bulkDeleteKeys.keys
  );

  const onSelectedChange = (
    selectedRowKeys: React.Key[],
    selectedRows: User[]
  ) => {
    setSelectedRows(selectedRows);
    dispatch(listActions.bulkDeleteData(selectedRows));
    dispatch(bulkDeleteActions.addKeys(selectedRowKeys));
  };

  const rowSelection = {
    selectedRows,
    selectedRowKeys,
    onChange: onSelectedChange,
  };
  return rowSelection;
};

export default RowSelection;
