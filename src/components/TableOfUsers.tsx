import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useRef, Key } from "react";
import { Input, Space, Button, Table } from "antd";
import { User } from "../types/types";
import { ColumnType } from "antd/lib/table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { detailsVisibleActions } from "../store/detailsVisible-slice";
import { editActions } from "../store/edit-slice";
import { deletedActions } from "../store/delete-slice";

const TableOfUsers: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  let searchInputRef = useRef<Input>(null);
  const actualListOfUsers = useSelector(
    (state: RootState) => state.listOfUsers.initialUsersLists
  );
  const loading = useSelector((state: RootState) => state.spinner.visible);
  const getColumnSearchProps: (dataIndex: string) => ColumnType<User> = (
    dataIndex
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0] as string);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string | number | boolean, record: User) =>
      (record as any)[dataIndex]
        ? (record as any)[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current!.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: Key[],
    confirm: any,
    dataIndex: string
  ) => {
    confirm();
    setSearchText((selectedKeys as any)[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };
  
  const columns: ColumnType<User>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 80,
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
      width: 80,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 80,
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 40,
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 40,
      filters: [
        {
          text: "female",
          value: "female",
        },
        {
          text: "male",
          value: "male",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 150,
      sorter: (a, b) => a.address.localeCompare(b.address),
      ...getColumnSearchProps("address"),
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 120,
      sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
      ...getColumnSearchProps("dateOfBirth"),
    },
    {
      title: "Hobbies",
      dataIndex: "hobbiesName",
      key: "hobbiesName",
      width: 100,
      ...getColumnSearchProps("hobbiesName"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Space id={record.id} size="middle">
            <Button
              id="details"
              onClick={() => {
                dispatch(detailsVisibleActions.toggle(record));
              }}
            >
              Detail
            </Button>
            <Button
              id="delete"
              onClick={() => {
                dispatch(deletedActions.userToDelete(record));
                dispatch(deletedActions.toggleVisibility());
              }}
            >
              Delete
            </Button>
            <Button
              id="edit"
              onClick={() => {
                dispatch(editActions.toggle(record));
              }}
            >
              Edit
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={actualListOfUsers}
        rowKey="id"
        loading={loading}
        bordered
      />
    </>
  );
};

export default TableOfUsers;
