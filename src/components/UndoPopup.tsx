import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { undoActions } from "../data/Slices/undo-slice";
import { bulkDeleteActions } from "../data/Slices/bulkDelete-slice";
import { buttonsActions } from "../data/Slices/buttons-slice";

interface myProps {
  visible: boolean;
  onOk: () => void;
}

const UndoPopup: React.FC<myProps> = (props) => {
  const deletedUsers = useSelector(
    (state: RootState) => state.undo.deletedUsers
  );
  const dispatch = useDispatch<AppDispatch>();

  const onCancel = () => {
    dispatch(undoActions.undoIsVisible());
    dispatch(undoActions.clearStateUsersToRecover());
		dispatch(buttonsActions.buttonsClear());
		dispatch(bulkDeleteActions.clear());
  };

  return (
    <Modal
      style={{ top: 20 }}
      title="Deleted users"
      visible={props.visible}
      onOk={props.onOk}
      onCancel={onCancel}
    >
      {deletedUsers.map((user) => (
        <p className="paragraph" key={`undo${user.id}`}>
          {user.name} {user.lastName}
          <span id={`tick${user.id}`} style={{visibility: "hidden"}}>✔</span>
          <Button
            disabled={false}
            id={`btn${user.id}`}
            onClick={() => {
              dispatch(buttonsActions.addButton(`btn${user.id}`));
              dispatch(buttonsActions.buttonConfirmed());
              dispatch(undoActions.usersToRecover(user));
            }}
          >
            Recover
          </Button>
        </p>
      ))}
    </Modal>
  );
};

export default UndoPopup;
