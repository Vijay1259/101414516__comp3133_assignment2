const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error('Failed to fetch employees');
      }
    },
    
    getEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      } catch (error) {
        throw new Error('Failed to fetch employee');
      }
    },
    
    searchEmployees: async (_, { term }) => {
      try {
        return await Employee.find({
          $or: [
            { firstName: { $regex: term, $options: 'i' } },
            { lastName: { $regex: term, $options: 'i' } },
            { department: { $regex: term, $options: 'i' } },
            { position: { $regex: term, $options: 'i' } }
          ]
        });
      } catch (error) {
        throw new Error('Error searching employees');
      }
    }
  },

  Mutation: {
    createEmployee: async (_, { firstName, lastName, email, department, position }) => {
      try {
        const newEmployee = new Employee({
          firstName,
          lastName,
          email,
          department,
          position
        });
        const result = await newEmployee.save();
        return result;
      } catch (error) {
        throw new Error('Failed to create employee');
      }
    },

    updateEmployee: async (_, { id, ...rest }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { $set: rest },
          { new: true }
        );
        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }
        return updatedEmployee;
      } catch (error) {
        throw new Error('Failed to update employee');
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
          throw new Error('Employee not found');
        }
        return deletedEmployee;
      } catch (error) {
        throw new Error('Failed to delete employee');
      }
    }
  }
};

module.exports = resolvers; 