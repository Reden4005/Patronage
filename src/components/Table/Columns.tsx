import { detailsVisibleActions } from "../../data/Slices/detailsVisible-slice";
import { editActions } from "../../data/Slices/edit-slice";
import { listActions } from "../../data/Slices/list-slice";
import { User } from "../../types";
import { Space, Button } from "antd";
import { ColumnType } from "antd/lib/table";
import { AppDispatch } from "../../data/store";
import { useDispatch } from "react-redux";
import FilterData from "./FilterData";
import { Link } from "react-router-dom";

const Columns = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getColumnSearchProps = FilterData();
  const columns: ColumnType<User>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "7%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
      width: "7%",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "5%",
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "7%",
      filters: [
        {
          text: "female",
          value: "female",
        },
        {
          text: "male",
          value: "male",
        },
        {
          text: "undefined",
          value: "undefined",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "15%",
      sorter: (a, b) => a.address.localeCompare(b.address),
      ...getColumnSearchProps("address"),
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: "12%",
      sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
      ...getColumnSearchProps("dateOfBirth"),
    },
    {
      title: "Hobbies",
      dataIndex: "hobbiesName",
      key: "hobbiesName",
      width: "15%",
      ...getColumnSearchProps("hobbiesName"),
      render: value => value.join(", "),
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: record => (
        <>
          <Space id={record.id} size="middle">
            <Link to={`/user-detail/${record.id}`}>
              <Button
                id="details"
                onClick={() => {
                  dispatch(detailsVisibleActions.toggle(record));
                }}>
                Details
              </Button>
            </Link>
            <Link to={`delete-user/${record.id}`}>
              <Button
                id="delete"
                onClick={() => {
                  dispatch(listActions.toggleConfirmDelete(record));
                }}>
                Delete
              </Button>
            </Link>
            <Link to={`edit-user/${record.id}`}>
              <Button
                id="edit"
                onClick={() => {
                  dispatch(editActions.toggle(record));
                }}>
                Edit
              </Button>
            </Link>
          </Space>
        </>
      ),
    },
  ];
  return columns;
};

export default Columns;
