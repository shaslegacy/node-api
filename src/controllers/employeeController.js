const EmployeeModel = require('../models/employeeModel')

exports.getEmployeeList = (req, res) => {

    EmployeeModel.getAllemployee((err, employees) => {

        if(err)
        res.send(err);
        console.log('Employee ', employees)
        res.send(employees)
    })
}

exports.getEmployeeById = (req, res) => {
    // console.log("Data fetched by ID")
    EmployeeModel.getEmployeeId(req.params.id, (err, employees) => {
        if(err)
        res.send(err);
        console.log("Employee", employees);
        res.send(employees);
    })
}

exports.createNewEmployee = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);

    //check value null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        req.send(400).send({success: false, message: "Please Fill the all data"});
    }else{
        EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
            if(err)
            res.send(err);
            console.log("Inserted", employee);
            res.json({status: true, message: "All data inserted successfully", data: employee})
        })
    }
}

exports.updateEmployeeData = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);

    //check value null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        req.send(400).send({success: false, message: "Please Fill the all data"});
    }else{
        EmployeeModel.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
            if(err)
            res.send(err);
            console.log("Updated", employee);
            res.json({status: true, message: "Employee Data Updated successfully"})
        })
    }
}

exports.deleteEmployeeData = (req, res) => {
    EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
        if(err)
        res.send(err);
        console.log("Data Deleted");
        res.json({status: true, message: "Data deleted successfully"})
    })
}