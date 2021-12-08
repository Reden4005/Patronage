import { Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import { useState } from "react";

interface myProps {
  visible: boolean;
  onOk: () => void;
}

const UndoPopup: React.FC<myProps> = (props) => {
  const deletedUsers = useSelector(
    (state: RootState) => state.undo.deletedUsers
  );

	const notClicked = {}
	const clicked = {borderColor: "green", color: "green"}
	const [style, setStyle] = useState(notClicked)
  return (
    <Modal
      style={{ top: 20 }}
      title="Deleted users"
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onOk}
    >
      {deletedUsers.map((user) => (
        <p className="paragraph" key={`undo${user.id}`}>
          {user.name} {user.lastName}
          <CheckOutlined id={`tick${user.id}`} style={style} />
          <Button
            id={`btn${user.id}`}
            style={style}
            onClick={() => {
              setStyle(clicked);
              console.log(user.id);
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
