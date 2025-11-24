import "./CustomerCard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";

interface CustomerCardProps {
  customer: CustomerModel;
  listType: string;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
  var defProfilePic = require("../../../Assets/Images/Profile/default.jpg");
  var profilePic = require("../../../Assets/Images/Profile/Customer/" + props.customer.image);

  return (
    <div className="CustomerCard">
      <div className="card">
        <div className="imgBx">
          <img src={profilePic} alt={defProfilePic} />
        </div>
        <div className="details">
          <h1>{props.customer.firstName} {props.customer.lastName}</h1>
          <p>{props.customer.email}</p>
        </div>
        {props.listType === "admin.customers" ? ( ///// ADMIN CUSTOMERS
                  <div className="buttons">
                  <Link to={`edit/${props.customer.id}`}>
                    <FaEdit size={36} />
                  </Link>
                  <Link to={`delete/${props.customer.id}`}>
                    <FaTrash size={36} />
                  </Link>
                </div>
        ) : <></>}

      </div>
    </div>
  );
}

export default CustomerCard;
