const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController')

// get all data
router.get('/', EmployeeController.getEmployeeList);

// get data using id
router.get('/:id', EmployeeController.getEmployeeById);

// Add new employee
router.post('/', EmployeeController.createNewEmployee);

// Updated Employee Data URL
router.put('/:id', EmployeeController.updateEmployeeData);

// deleted employee data
router.delete('/:id', EmployeeController.deleteEmployeeData);

module.exports = router;