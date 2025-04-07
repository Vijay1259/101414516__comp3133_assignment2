// Optional reusable GraphQL queries (not required if inline in service)

export const GET_ALL_EMPLOYEES = `
  query {
    getAllEmployees {
      _id
      name
      email
      department
      position
      profile
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = (id: string) => `
  query {
    getEmployeeById(id: "${id}") {
      _id
      name
      email
      department
      position
      profile
    }
  }
`;

export const SEARCH_EMPLOYEES = (term: string) => `
  query {
    searchEmployees(term: "${term}") {
      _id
      name
      email
      department
      position
      profile
    }
  }
`; 
