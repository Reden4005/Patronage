import { Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface myProps {
  visible: boolean;
  onOk: () => void;
}

const DetailsOfUser: React.FC<myProps> = (props) => {
  const details = useSelector((state: RootState) => state.details.details);

  return (
    <Modal
      style={{ top: 20 }}
      title="Details about user"
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onOk}
    >
      <p>
        Name:{" "}
        <span className="details">
          {details?.name} {details?.lastName}
        </span>
      </p>
      <p>
        Email: <span className="details">{details?.email}</span>
      </p>
      <p>
        Age: <span className="details">{details?.age}</span>
      </p>
      <p>
        Gender: <span className="details">{details?.gender}</span>
      </p>
      <p>
        Phone number: <span className="details">{details?.phoneNumber}</span>
      </p>
      <p>
        Address: <span className="details">{details?.address}</span>
      </p>
      <p>
        Date of birth: <span className="details">{details?.dateOfBirth}</span>
      </p>
      <p>
        Hobbies: <span className="details">{details?.hobbiesName}</span>
      </p>
    </Modal>
  );
};

export default DetailsOfUser;
