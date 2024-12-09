from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql

app = Flask(__name__)

CORS(app)

SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@127.0.0.1:3306/employee_details"
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Employee_list(db.Model):
    __tablename__ = "employee_detail"
    emp_no = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_Name = db.Column(db.String)
    emp_email = db.Column(db.String)
    emp_pno = db.Column(db.Integer)
    emp_id = db.Column(db.Integer)
    emp_role = db.Column(db.String)
    company_name = db.Column(db.String)
    

@app.route('/creat_emp', methods=["POST"])
def setEmp_list():
        data = request.form
        setdata = Employee_list(
              employee_Name=data["employee_Name"],
            emp_email=data["emp_email"],
            emp_pno=data["emp_pno"],
            emp_id=data["emp_id"],
            emp_role=data["emp_role"],
            company_name=data["company_name"]
        )
        db.session.add(setdata)
        db.session.commit()
        return jsonify({"message": "Employee created successfully"}), 201
  

@app.route("/emps_list", methods=["GET"])
def getRegData():
    registerdatas = Employee_list.query.all()
    return jsonify([
        {
              "emp_no": employee.emp_no,
            "employee_Name": employee.employee_Name,
            "emp_email": employee.emp_email,
            "emp_pno": employee.emp_pno,
            "emp_id": employee.emp_id,
            "emp_role": employee.emp_role,
            "company_name": employee.company_name
            
        } for employee in registerdatas
    ])

@app.route("/deleteData/<int:emp_no>", methods=["DELETE"])
def deleteData(emp_no):
    deleteTodo = Employee_list.query.filter_by(emp_no=emp_no).first()
    db.session.delete(deleteTodo)
    db.session.commit()
    return jsonify({"message": "Delete success"}), 200



@app.route('/clearData', methods=['DELETE'])
def clear_data():
        db.session.query(Employee_list).delete()  
        db.session.commit() 
        return jsonify({"message": "All student records have been cleared."}), 200


@app.route("/viewDatas/<int:emp_no>", methods = ["GET"])
def editData(emp_no):

    editTodo = Employee_list.query.filter_by(emp_no= emp_no).first()

    return jsonify (
                     { "emp_no" : editTodo.emp_no,
                      "employee_Name" : editTodo.employee_Name,
                      "emp_email" : editTodo.emp_email,
                      "emp_pno" : editTodo.emp_pno,
                      "emp_id" : editTodo.emp_id,
                      "emp_role" : editTodo.emp_role,
                      "company_name" : editTodo.company_name
                      }
                      ),200


@app.route("/updateData/<int:emp_no>", methods=["PUT"])
def updateData(emp_no):
    todo = Employee_list.query.filter_by(emp_no=emp_no).first()

    todo.employee_Name = request.form["employee_Name"]
    todo.emp_email = request.form["emp_email"]
    todo.emp_pno = request.form["emp_pno"]
    todo.emp_id = request.form["emp_id"]
    todo.emp_role = request.form["emp_role"]
    todo.company_name = request.form["company_name"]
    db.session.commit()

    return f'Updated user is {emp_no}', 200

