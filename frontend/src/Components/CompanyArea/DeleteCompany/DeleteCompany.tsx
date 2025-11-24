import "./DeleteCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { companyDeletedAction } from "../../../Redux/CompaniesAppState";
import { ImCheckmark, ImCross } from "react-icons/im";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { deleteCompany } from "../../../WebApi/AdminApi";
import CompanyCard from "../CompanyCard/CompanyCard";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";

function DeleteCompany(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || "");
  const [company, setCompany] = useState<CompanyModel>(store.getState().companyReducer.companies.filter(company => company.id === id)[0]);

  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  const yes = () => {
    deleteCompany(id)
      .then((any) => {
        notify.success(SccMsg.DELETED_COMPANY);
        store.dispatch(companyDeletedAction(id));
        navigate("/admin/companies");
      })
      .catch((err) => notify.error(err));
  };

  const no = () => {
    navigate("/admin/companies")
  };

  return (
    <div className="DeleteCompany">
      <div className="box">
        <h2>Delete Company</h2>
        <p>Are you sure you want to delete this, my precious?</p>
        <CompanyCard key={company.id} company={company} listType={"single.company"}/>
        <span>
          <ImCross className="cross"size={42} onClick={no}/>
          <ImCheckmark className="check" size={50} onClick={yes}/>
        </span>
      </div>
    </div>
  );
}

export default DeleteCompany;
