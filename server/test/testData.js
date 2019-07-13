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
    bus_id: 1,
    origin: 'Mile 2',
    destination: 'Berger',
    trip_date: '2019-12-12',
    fare: 350.00
  },
  validCancelTrip: {
    status: 'cancelled'
  },
  invalidCancelTrip: {
    status: 'cancel'
  }
}

const bookingTestData = {
  validBooking: {
    trip_id: 1,
    seat_number: 2
  },
  nonExistingTripBooking: {
    trip_id: 2,
    seat_number: 6
  }
}

export { authTestData, tripTestData, bookingTestData };