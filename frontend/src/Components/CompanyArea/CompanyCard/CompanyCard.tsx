import "./CompanyCard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";

interface CompanyCardProps {
  company: CompanyModel;
  listType: string;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  var defProfilePic = require("../../../Assets/Images/Profile/default.jpg");
  var profilePic = require("../../../Assets/Images/Profile/Company/" + props.company.image);

  return (
    <div className="CompanyCard">
      <div className="card">
        <div className="imgBx">
          <img src={profilePic} alt={defProfilePic} />
        </div>
        <div className="details">
          <h1>{props.company.name}</h1>
          <p>{props.company.email}</p>
        </div>
        {props.listType === "admin.companies" ? ( ///// ADMIN COMPANIES
          <div className="buttons">
            <Link to={`edit/${props.company.id}`}>
              <FaEdit size={36} />
            </Link>
            <Link to={`delete/${props.company.id}`}>
              <FaTrash size={36} />
            </Link>
          </div>
        ) : <></>}
      </div>
    </div>
  );
}

export default CompanyCard;
