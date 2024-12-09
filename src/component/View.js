import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./View.css";

const View = () => {
  const [viewItem, setViewItem] = useState({});
  const { emp_no } = useParams();
  const navigate = useNavigate();

  const handleEditData = async () => {
    const viewData = await axios.get(
      `http://127.0.0.1:5000/viewDatas/${emp_no}`
    );
    setViewItem(viewData.data);
    console.log(viewData.data);
  };

  useEffect(() => {
    handleEditData();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Student Detail</h1>
        <div className="detail">
          <h3>Employee No: {viewItem.emp_no}</h3>
          <h3>Employee Name: {viewItem.employee_Name}</h3>
          <h3>Employee Email: {viewItem.emp_email}</h3>
          <h3>Employee PhoneNO: {viewItem.emp_pno}</h3>
          <h3>Employee ID: {viewItem.emp_id}</h3>
          <h3>Employee ROLE: {viewItem.emp_role}</h3>
          <h3>COMPANY NAME: {viewItem.company_name}</h3>
        </div>
        <button onClick={handleBackClick} className="back-btn">
          Go to List
        </button>
      </div>
    </div>
  );
};

export default View;
