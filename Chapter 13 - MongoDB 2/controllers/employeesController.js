const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
	const employees = await Employee.find({}).exec();
	if (!employees)
		return res.status(204).json({ message: 'No employee found,,' });
	res.json(employees);
};

const createNewEmployee = async (req, res) => {
	if (!req?.body?.firstname || !req?.body?.lastname) {
		return res
			.status(400)
			.json({ message: 'Error: firstname and lastname is required' });
	}
	try {
		const newEmployee = await Employee.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		});
		console.log(newEmployee);
		res.status(201).json(newEmployee);
	} catch (err) {
		console.error(err);
	}
};

const updateEmployee = async (req, res) => {
	//get the id of employee
	if (!req?.body?.id)
		return res
			.status(400)
			.json({ message: `Error: Employee ID ${req.body.id} not found.` });

	const employee = await Employee.findOne({ _id: req.body.id }).exec();

	if (!employee) {
		return res.status(204).json({ message: `No employee matches..` });
	}
	if (req.body?.firstname) employee.firstname = req.body.firstname;
	if (req.body?.lastname) employee.lastname = req.body.lastname;

	const result = await employee.save();

	res.json(result);
};

const deleteEmployee = async (req, res) => {
	//get the id of the employee
	if (!req?.body?.id)
		return res.status(400).json({ message: `Employee id is required` });

	//filter the data without the curr id.
	const employee = await Employee.findOne({ _id: req.body.id }).exec();
	if (!employee)
		return res
			.status(204)
			.json({ message: `Error: Employee id ${req.body.id}} not found.` });

	const result = await employee.deleteOne({ _id: req.body.id });

	res.json(result);
};

const getEmployee = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).json({ message: 'employee id is required' });

	const employee = await Employee.findOne({ _id: req.params.id });
	if (!employee) return res.status(201).json({ message: 'Employee not found' });

	res.json(employee);
};

module.exports = {
	getAllEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
