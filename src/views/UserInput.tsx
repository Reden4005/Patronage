import { Form, Input, InputNumber, Select, DatePicker, Modal } from "antd";
import { User } from "../types";
import { UserData } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

interface UserFormProps {
  visible: boolean;
  onCreate: (values: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onCreate, onCancel }) => {
  let navigate = useNavigate();
  const [form] = Form.useForm<UserData>();
  const hobbies = useSelector((state: RootState) => state.hobbies.hobbies);

  return (
    <Modal
      visible={visible}
      title="Add new user"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => navigate("/")}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate({
              ...values,
              id: uuidv4(),
              dateOfBirth: values["dateOfBirth"]
                ? values["dateOfBirth"].format("YYYY-MM-DD")
                : "",
              gender: values["gender"] ? values["gender"] : "undefined",
              hobbiesName: values["hobbies"],
            });
          })
          .then(() => {
            navigate("/");
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}>
        <h4
          style={{
            fontWeight: "bold",
            color: "#444444",
          }}>
          PERSONAL INFORMATION
        </h4>
        <p style={{ borderBottom: "1px solid #444444", width: "99%" }}></p>
        <Form.Item name={["name"]} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["lastName"]}
          label="Last name"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99, required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={["dateOfBirth"]} label="Date of birth">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Gender" name={["gender"]}>
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <h4
          style={{
            fontWeight: "bold",
            color: "#444444",
          }}>
          CONTACT INFORMATION
        </h4>
        <p style={{ borderBottom: "1px solid #444444", width: "99%" }}></p>
        <Form.Item
          name={["email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={["phoneNumber"]} label="phoneNumber">
          <Input placeholder="+1 (234) 567-8910" />
        </Form.Item>
        <Form.Item name={["address"]} label="address">
          <Input />
        </Form.Item>
        <h4
          style={{
            fontWeight: "bold",
            color: "#444444",
          }}>
          ADDITIONAL INFORMATION
        </h4>
        <p style={{ borderBottom: "1px solid #444444", width: "99%" }}></p>
        <Form.Item
          label="Hobbies"
          name={["hobbies"]}
          rules={[{ required: true }]}>
          <Select mode="multiple">
            {hobbies.map(el => {
              return (
                <Option key={el.id} value={el.name}>
                  {el.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
