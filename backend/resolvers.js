const User = require('./models/User');
const Employee = require('./models/Employee');
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const SECRET = 'secret123'; // You can change this or move to .env

// Authentication middleware
const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    const { userId } = jwt.verify(token, SECRET);
    return await User.findById(userId);
  } catch (error) {
    return null;
  }
};

module.exports = {
  Query: {
    employees: async (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return await Employee.find();
    },
    employee: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return await Employee.findById(id);
    },
    searchEmployees: async (_, { searchTerm }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return await Employee.find({
        $or: [
          { department: { $regex: searchTerm, $options: 'i' } },
          { position: { $regex: searchTerm, $options: 'i' } }
        ]
      });
    },
    me: async (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return user;
    }
  },

  Mutation: {
    signup: async (_, { input: { name, email, password } }) => {
      const existing = await User.findOne({ email });
      if (existing) {
        throw new GraphQLError('User already exists');
      }
      const user = new User({ name, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1d' });
      return { token, user };
    },

    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        throw new GraphQLError('Invalid credentials');
      }
      const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1d' });
      return { token, user };
    },

    addEmployee: async (_, { input }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      const employee = new Employee(input);
      return await employee.save();
    },

    updateEmployee: async (_, { id, input }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return await Employee.findByIdAndUpdate(
        id,
        input,
        { new: true }
      );
    },

    deleteEmployee: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      await Employee.findByIdAndDelete(id);
      return { message: "Employee deleted successfully" };
    }
  }
};