import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { listActions } from "../data/Slices/list-slice";

interface myProps {
  visible: boolean;
  deleteUsers: () => void;
}

const PopupBulkDeleteConfirmation: React.FC<myProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const deletedUsers = useSelector(
    (state: RootState) => state.listOfUsers.usersToDelete
  );

  const handleCancel = () => {
    dispatch(listActions.toggleConfirmBulkDelete());
  };

  return (
    <Modal
      title="Are you sure you want delete:"
      visible={props.visible}
      onOk={props.deleteUsers}
      onCancel={handleCancel}
    >
      {deletedUsers ? deletedUsers!.map(user => <p key={`del ${user.id}`}>{user?.name} {user?.lastName}</p>) : null}
    </Modal>
  );
};

export default PopupBulkDeleteConfirmation;
