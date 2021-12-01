import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deletedActions } from "../store/delete-slice";
import { AppDispatch, RootState } from "../store/store";

interface myProps {
	visible: boolean;
  deleteUser: () => void;
}

const PopupDeleteConfirmation: React.FC<myProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const deletedUser = useSelector(
    (state: RootState) => state.delete.deletedUser
  );

  const handleCancel = () => {
    dispatch(deletedActions.toggleVisibility());
  };

  return (
    <Modal
      title="Are you sure you want delete:"
      visible={props.visible}
      onOk={props.deleteUser}
      onCancel={handleCancel}
    >
      <p>
        {deletedUser?.name} {deletedUser?.lastName}
      </p>
    </Modal>
  );
};

export default PopupDeleteConfirmation;
