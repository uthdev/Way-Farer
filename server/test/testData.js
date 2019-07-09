const authTestData = {
  validUserData: {
    email: 'johnjones@email.com',
    password: 'asdf1234',
    first_name: 'john',
    last_name: 'Jones'
  },
  invalidUserData: {
    email: '',
    password: 'asdf1234',
    first_name: 'john',
    last_name: 'Jones',
  },
}

export { authTestData };