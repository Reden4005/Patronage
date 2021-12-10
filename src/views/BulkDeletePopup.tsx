import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { listActions } from "../data/Slices/list-slice";
import { bulkDeleteActions } from "../data/Slices/bulkDelete-slice";
import { useNavigate } from "react-router-dom";

interface myProps {
  visible: boolean;
  onOk: () => void;
}

const BulkDeletePopup: React.FC<myProps> = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const deletedUsers = useSelector(
    (state: RootState) => state.listOfUsers.usersToDelete
  );

  const handleCancel = () => {
    dispatch(listActions.bulkDeleteIsVisible());
    dispatch(bulkDeleteActions.clear());
    navigate("/");
  };

  return (
    <Modal
      title="Are you sure you want to delete:"
      visible={props.visible}
      onOk={props.onOk}
      onCancel={handleCancel}
      okText="Delete"
      okButtonProps={{ danger: true }}>
      {deletedUsers
        ? deletedUsers!.map(user => (
            <p key={`del ${user.id}`}>
              {user?.name} {user?.lastName}
            </p>
          ))
        : null}
    </Modal>
  );
};

export default BulkDeletePopup;
