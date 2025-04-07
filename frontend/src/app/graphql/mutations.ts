// Optional reusable GraphQL mutations (not required if inline in service)

export const LOGIN_MUTATION = (email: string, password: string) => `
  mutation {
    login(email: "${email}", password: "${password}") {
      token
    }
  }
`;

export const SIGNUP_MUTATION = (name: string, email: string, password: string) => `
  mutation {
    signup(name: "${name}", email: "${email}", password: "${password}") {
      id
      email
    }
  }
`;

export const DELETE_EMPLOYEE = (id: string) => `
  mutation {
    deleteEmployee(id: "${id}") {
      message
    }
  }
`; 
