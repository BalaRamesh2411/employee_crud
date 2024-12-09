import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const getall = async () => {
    let getData = await axios.get(`http://127.0.0.1:5000/emps_list`);
    setEmployeeData(getData.data);
    console.log(getData);
  };

  useEffect(() => {
    getall();
  }, []);

  const deleteuser = async (emp_no) => {
    await axios
      .delete(`http://127.0.0.1:5000/deleteData/${emp_no}`)
      .then((res) => {
        console.log(res, "res");
        alert(res.data.message);
        getall();
      });
  };

  const handleClear = async () => {
    const response = await axios.delete("http://127.0.0.1:5000/clearData");
    console.log(response.data.message);
    alert("clear the data successfully");
    getall();
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Employee ID</th>
            <th>Role</th>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((detail, i) => (
            <tr key={i}>
              <td>{detail.employee_Name}</td>
              <td>{detail.emp_email}</td>
              <td>{detail.emp_pno}</td>
              <td>{detail.emp_id}</td>
              <td>{detail.emp_role}</td>
              <td>{detail.company_name}</td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit/${detail.emp_no}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-sm me-2"
                    onClick={() => navigate(`/view/${detail.emp_no}`)}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteuser(detail.emp_no)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/create")}
        >
          Create Employee
        </button>
        <button type="button" className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default List;
