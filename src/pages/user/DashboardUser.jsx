import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import TGRContent from "./TGRContent";
import NoTGRContent from "./NoTGRContent";
import DocumentUser from "./DocumentUser";
import ValidasiUser from "./ValidasiUser";
import axios from "axios";

const DashboardUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [submission, setSubmission] = useState(null);
  const [slip, setSlip] = useState(null);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
const statusNull = () => {

  return (
    <div className="card-title">
      <h3 className="mb-4 text-xl font-semibold">Halo, {user.name}</h3>
    </div>
  );
}

  useEffect(() => {
    const fetchSubmissionAndSlip = async () => {
      try {
        if (user && user.id) {
          const submissionResponse = await axios.get(
            `http://localhost:5000/submissions/user/${user.id}`
          );
          const submissions = submissionResponse.data;
          const latestSubmission = submissions.sort((a, b) => b.id - a.id)[0];
          setSubmission(latestSubmission);

          const slipResponse = await axios.get(
            `http://localhost:5000/slips/user/${user.id}`
          );
          const slips = slipResponse.data;
          const latestSlip = slips.sort((a, b) => b.id - a.id)[0];
          setSlip(latestSlip);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubmissionAndSlip();
  }, [user]);

  let contentToRender = null;
  

  if (user) {
    if (user && user.status === null || user && user.status === "" || user && user.status === "NULL" ) {
      contentToRender =  statusNull();
    } else {
      if (
        (submission && submission.status === "Diproses") ||
        (slip && slip.status === "Diproses")
      ) {
        contentToRender = <ValidasiUser user={user} />;
      } else {
        if (user.amountTGR > 0 && user.isTGR) {
          contentToRender = <TGRContent user={user} />;
        } else if (user.amountTGR === 0 && user.isTGR) {
          contentToRender = <NoTGRContent user={user} />;
        } else if (submission && submission.status === "Diproses") {
          contentToRender = <ValidasiUser user={user} />;
        } else if (slip && slip.status === "Diproses") {
        } else if (slip && slip.status === "Ditolak") {
          contentToRender = <NoTGRContent user={user} />;
        } else if (submission && submission.status === "Ditolak") {
          contentToRender = <NoTGRContent user={user} />;
        } else if (
          (user && user.amountTGR === 0) ||
          (slip && slip.isTGR === 0)
        ) {
          contentToRender = <DocumentUser user={user} />;
        }
      }
    }
    
   
  }

  return <>{contentToRender}</>;
};

export default DashboardUser;
