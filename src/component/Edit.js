import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const Navigate = useNavigate();
  const { emp_no } = useParams();

  const handleEditData = async () => {
    const editData = await axios.get(
      `http://127.0.0.1:5000/viewDatas/${emp_no}`
    );
    setEmployeeDetails(editData.data);
    console.log(editData.data);
  };

  useEffect(() => {
    handleEditData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("employee_Name", employeeDetails.employee_Name);
    formData.append("emp_email", employeeDetails.emp_email);
    formData.append("emp_pno", employeeDetails.emp_pno);
    formData.append("emp_id", employeeDetails.emp_id);
    formData.append("emp_role", employeeDetails.emp_role);
    formData.append("company_name", employeeDetails.company_name);

    await axios
      .put(`http://127.0.0.1:5000/updateData/${emp_no}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Updated successfully");
        Navigate("/");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="row g-3 w-50 border p-4 rounded shadow">
        <h1 className="text-center w-100 mb-4">Employee Details</h1>

        <div className="col-md-6">
          <label htmlFor="empname" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            id="empname"
            placeholder="Enter Employee name"
            value={employeeDetails.employee_Name}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                employee_Name: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="emailId" className="form-label">
            Email ID
          </label>
          <input
            type="email"
            className="form-control"
            id="emailId"
            placeholder="Enter Email ID"
            value={employeeDetails.emp_email}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                emp_email: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            value={employeeDetails.emp_pno}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                emp_pno: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="empid" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empid"
            placeholder="Enter employee id"
            value={employeeDetails.emp_id}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                emp_id: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="empRole" className="form-label">
            Employee Role
          </label>
          <input
            type="text"
            className="form-control"
            id="empRole"
            placeholder="Enter Employee Role"
            value={employeeDetails.emp_role}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                emp_role: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="companyname" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter company Name"
            value={employeeDetails.company_name}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                company_name: e.target.value,
              })
            }
          />
        </div>
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
