import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { listActions } from "../data/Slices/list-slice";

interface myProps {
	visible: boolean;
  deleteUser: () => void;
}

const DeletePopup: React.FC<myProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const deletedUser = useSelector(
    (state: RootState) => state.listOfUsers.userToDelete
  );

  const handleCancel = () => {
    dispatch(listActions.toggleConfirmDelete(null));
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

export default DeletePopup;
