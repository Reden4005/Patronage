import { Button } from "antd";
import { User } from "../types/types";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 80,
  },
  {
    title: "Lastname",
    dataIndex: "lastName",
    key: "lastName",
    width: 80,
    sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 80,
    sorter: (a: any, b: any) => a.email.localeCompare(b.email),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 40,
    sorter: (a: any, b: any) => a.age - b.age,
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
    onFilter: (value: any, record: User) => record.gender.indexOf(value) === 0,
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
  },
  {
    title: "Date of birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    width: 120,
    sorter: (a: any, b: any) => a.dateOfBirth.localeCompare(b.dateOfBirth),
  },
  {
    title: "Hobbies",
    dataIndex: "hobbiesName",
    key: "hobbiesName",
    width: 100,
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <Button>Delete</Button>,
  },
  {
    title: "Action",
    dataIndex: "",
    key: "y",
    render: () => <Button>Details</Button>,
  },
];


