const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    department: String!
    position: String!
    profile: String
  }

  type Query {
    getAllEmployees: [Employee]!
    getEmployee(id: ID!): Employee
    searchEmployees(term: String!): [Employee]!
  }

  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      email: String!
      department: String!
      position: String!
    ): Employee!

    updateEmployee(
      id: ID!
      firstName: String
      lastName: String
      email: String
      department: String
      position: String
    ): Employee

    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs; 