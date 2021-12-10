import { Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";

interface myProps {
  visible: boolean;
  onOk: () => void;
}

const DetailsOfUser: React.FC<myProps> = props => {
  const details = useSelector((state: RootState) => state.details.details);

  return (
    <Modal
      title="Details about user"
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onOk}>
      <h4
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#1890FF",
        }}>
        PERSONAL INFORMATION
      </h4>
      <p
        style={{
          borderBottom: "1px solid grey",
          width: "95%",
        }}></p>
      <p className="detailsParagraph">
        Name:{" "}
        <span className="details">
          {details?.name} {details?.lastName}
        </span>
      </p>
      <p>
        Age: <span className="details">{details?.age}</span>
      </p>
      <p>
        Date of birth: <span className="details">{details?.dateOfBirth}</span>
      </p>
      <p>
        Gender: <span className="details">{details?.gender}</span>
      </p>
      <h4
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#1890FF",
        }}>
        CONTACT INFORMATION
      </h4>
      <p style={{ borderBottom: "1px solid grey", width: "95%" }}></p>
      <p className="detailsParagraph">
        Email: <span className="details">{details?.email}</span>
      </p>

      <p>
        Phone number: <span className="details">{details?.phoneNumber}</span>
      </p>
      <p>
        Address: <span className="details">{details?.address}</span>
      </p>
      <h4
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#1890FF",
        }}>
        ADDITIONAL INFORMATION
      </h4>
      <p style={{ borderBottom: "1px solid grey", width: "95%" }}></p>
      <p className="detailsParagraph">
        Hobbies: <span className="details">{details?.hobbiesName}</span>
      </p>
    </Modal>
  );
};

export default DetailsOfUser;
