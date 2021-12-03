import { Form, Input, InputNumber, Select, DatePicker, Modal } from "antd";
import HOBBIES from "../data/HOBBIES";
import { User } from "../types";
import { UserData } from "../types";
import { generateId } from "../Utils/idGenerator";

const { Option } = Select;

interface UserFormProps {
  visible: boolean;
  onCreate: (values: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onCreate, onCancel }) => {
  //////typ <>
  const [form] = Form.useForm<UserData>();

  return (
    <Modal
      visible={visible}
      title="Add new user"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log(values);
            onCreate({
              ...values,
              id: generateId("user"),
              dateOfBirth: values["dateOfBirth"]
                ? values["dateOfBirth"].format("YYYY-MM-DD")
                : "",
              hobbiesName: values["hobbies"].join(" "),
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item name={["name"]} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["lastName"]}
          label="Last name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99, required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Gender" name={["gender"]}>
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["phoneNumber"]} label="phoneNumber">
          <Input
            placeholder="+1 (234) 567-8910"
          />
        </Form.Item>
        <Form.Item name={["address"]} label="address">
          <Input />
        </Form.Item>
        <Form.Item name={["dateOfBirth"]} label="Date of birth">
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Hobbies"
          name={["hobbies"]}
          rules={[{ required: true }]}
        >
          <Select mode="multiple">
            {HOBBIES.map((el) => {
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
