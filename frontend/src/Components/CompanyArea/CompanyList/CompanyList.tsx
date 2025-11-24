import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { companiesClearAction, companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { getCompanies } from "../../../WebApi/AdminApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./CompanyList.css";

function CompanyList(): JSX.Element {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companyReducer.companies
  );
  // store.dispatch(companiesClearAction()); // cleans the loaded list of companies


  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  //Side effect goes here
  useEffect(() => {
    if (companies?.length === 0) {
      getCompanies()
      .then((res) => {
        //Update component state
        setCompanies(res.data);
        //Update app state
        store.dispatch(companiesDownloadedAction(res.data));
        notify.success(SccMsg.GOT_COMPANIES);
      })
      .catch((err) => {
        notify.error(err)
      });
    }
  }, []);

  return (
    <div className="CompanyList">
      <h1>Companies:</h1>
      <CustomLink to="add">
        <FaPlusCircle size={42} />
      </CustomLink>
      {companies?.length > 0 ? (
        <div className="container">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} listType={"admin.companies"} />
          ))}
        </div>
      ) : (
        <EmptyView msg="No companies for you!" />
      )}
    </div>
  );
}

export default CompanyList;
