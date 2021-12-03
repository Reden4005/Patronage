import { Form, Input, InputNumber, Select, Modal } from "antd";
import HOBBIES from "../data/HOBBIES";
import { User } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../data/store";
import { editActions } from "../data/Slices/edit-slice";
import { useEffect } from "react";

const { Option } = Select;

interface UserFormProps {
  visible: boolean;
  onCreate: (values: User) => void;
}

const EditUser: React.FC<UserFormProps> = ({ visible, onCreate }) => {
  const edit = useSelector((state: RootState) => state.edit.edit);
  const [form] = Form.useForm<User>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    form.setFieldsValue(edit!);
    return () => {
      form.resetFields();
    };
  }, [edit, form])
   
  return (
    <Modal
      visible={visible}
      getContainer={false}
      title="Edit a user"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => dispatch(editActions.close())}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({
              ...values
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
        <Form.Item
          name={["name"]}
          label="Name"
          rules={[{ required: true }]}
        >
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
          rules={[{ type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Gender" name={["gender"]}>
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={["phoneNumber"]}
          label="phoneNumber"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["address"]}
          label="address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["dateOfBirth"]}
          label="Date of birth"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hobbies"
          name={["hobbiesName"]}
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

export default EditUser;
