const authTestData = {
  validUserData: {
    email: 'johnjones@email.com',
    password: 'asdf1234',
    first_name: 'john',
    last_name: 'Jones',
  },
  invalidUserData: {
    email: '',
    password: 'asdf1234',
    first_name: 'john',
    last_name: 'Jones',
  },
  existingUserSignIn: {
    email: 'johnjones@email.com',
    password: 'asdf1234',
  },
  nonExistentUser: {
    email: 'alphabets@gmail.com',
    password: 'abcdefgh',
  },
  missingLoginField: {
    email: '',
    password: 'Bradit##',
  },
  wrongPassword: {
    email: 'johnjones@email.com',
    password: 'wrongpass',
  },
};

const tripTestData = {
  validTrip: {
    bus_id: 2,
    origin: 'Mile 2',
    destination: 'Berger',
    trip_date: '2019-12-12',
    fare: 350.00
  }
}

export { authTestData, tripTestData };
