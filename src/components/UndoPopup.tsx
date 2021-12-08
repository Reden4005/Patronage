import { Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { undoActions } from "../data/Slices/undo-slice";

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
		dispatch(undoActions.clearStateUsersToRecover())
	}
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
          <CheckOutlined id={`tick${user.id}`} />
          <Button
            id={`btn${user.id}`}
            
            onClick={(event) => {
              
							dispatch(undoActions.usersToRecover(user))
              console.log(event.target);
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
