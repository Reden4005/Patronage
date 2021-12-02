import { Form, Input, InputNumber, Select, DatePicker, Modal } from "antd";
import HOBBIES from "../store/HOBBIES";
import { User } from "../types/types";
import { UserData } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import moment from "moment";

const { Option } = Select;

interface UserFormProps {
  visible: boolean;
  onCreate: (values: User) => void;
  onCancel: () => void;
}

const EditUser: React.FC<UserFormProps> = ({ visible, onCreate, onCancel }) => {
  const edit = useSelector((state: RootState) => state.edit.edit);
  const [form] = Form.useForm<UserData>();

  return (
    <Modal
      visible={visible}
      title="Edit a user"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({
              ...values,
              dateOfBirth: values["dateOfBirth"]
                ? values["dateOfBirth"].format("YYYY-MM-DD")
                : "",
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
        <Form.Item name={["name"]} label="Name" rules={[{ required: true }]} initialValue={edit?.name}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["lastName"]}
          label="Last name"
          rules={[{ required: true }]}
					initialValue={edit?.lastName}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["email"]} label="Email" rules={[{ type: "email" }]} initialValue={edit?.email}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
					initialValue={edit?.age}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Gender" name={["gender"]} initialValue={edit?.gender}>
          <Select >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["phoneNumber"]} label="phoneNumber" initialValue={edit?.phoneNumber}>
          <Input />
        </Form.Item>
        <Form.Item name={["address"]} label="address" initialValue={edit?.address}>
          <Input />
        </Form.Item>
        <Form.Item name={["dateOfBirth"]} label="Date of birth" initialValue={moment(edit?.dateOfBirth)}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Hobbies" name={["hobbies"]} initialValue={[edit?.hobbiesName]}>
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

export default EditUser;
