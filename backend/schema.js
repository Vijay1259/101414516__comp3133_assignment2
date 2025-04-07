const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    department: String!
    position: String!
    profile: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
    searchEmployees(searchTerm: String!): [Employee!]!
    me: User
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    signup(input: SignupInput!): AuthPayload!
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): DeleteResponse!
  }

  input EmployeeInput {
    name: String!
    email: String!
    department: String!
    position: String!
    profile: String
  }

  type DeleteResponse {
    message: String!
  }
`;

module.exports = typeDefs;
