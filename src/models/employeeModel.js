const db = require('../configs/dbConfig')

const Employee = function(employee) {
    this.name = employee.name;
    this.position = employee.position;
    this.salary = employee.salary;
}

Employee.getAllemployee = (result) => {
    db.query("select * from employee", (err, res) => {
        if (err){
            console.log("Error while Fetching employee", err);
            result(null, err)
        }else{
            console.log("Employee list fetched successfully");
            result(null, res)
        }
    })
}

Employee.getEmployeeId = (id, result) => {
    db.query("select * from employee where id = ?", id, (err, res) => {
        if(err){
            console.log("Error when data fetche by id", err);
            result(null, err)
        }else{
            console.log("Employee data by id fetched");
            result(null, res)
        }
    })
}

Employee.createEmployee = (employeeReqData, result) => {
    db.query("insert into employee SET ?", employeeReqData, (err, res) => {
        if(err){
            console.log("Error when data inserted", err);
            result(null, err)
        }else{
            console.log("Employee data have been inserted");
            result(null, res)
        }
    })
}

Employee.updateEmployee = (id, employeeReqData, result) => {
    db.query("update employee SET name = ?, position = ?, salary = ? where id = ?", [employeeReqData.name, employeeReqData.position, employeeReqData.salary, id],
     (err, res) => {
         if(err){
             console.log("Something Error while updating data", err);
             result(null, err);
         }else{
             console.log("Employee updated successfully");
             result(null, res);
         }
     })
}

Employee.deleteEmployee = (id, result) => {
    db.query("delete from employee where id = ?", [id], (err,res) => {
        if(err){
            console.log("Error while delete data", err);
            result(null, err)
        }else{
            console.log("Employee deleted successfully");
            result(null, res)
        }
    })
}

module.exports = Employee;