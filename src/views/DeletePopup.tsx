import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { listActions } from "../data/Slices/list-slice";
import { useNavigate } from "react-router-dom";

interface myProps {
  visible: boolean;
  deleteUser: () => void;
}

const DeletePopup: React.FC<myProps> = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const deletedUser = useSelector(
    (state: RootState) => state.listOfUsers.userToDelete
  );

  const handleCancel = () => {
    dispatch(listActions.toggleConfirmDelete(null));
    navigate("/");
  };

  return (
    <Modal
      title="Are you sure you want to delete:"
      visible={props.visible}
      onOk={props.deleteUser}
      onCancel={handleCancel}
      okText="Delete"
      okButtonProps={{ danger: true }}>
      <p>
        {deletedUser?.name} {deletedUser?.lastName}
      </p>
    </Modal>
  );
};

export default DeletePopup;
