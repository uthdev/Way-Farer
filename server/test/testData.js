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
  validTrip1: {
    bus_id: 1,
    origin: 'Mile 2',
    destination: 'Berger',
    trip_date: '2019-10-10',
    fare: 350.00
  },
  validTrip2: {
    bus_id: 1,
    origin: 'Mile 2',
    destination: 'Oshodi',
    trip_date: '2019-12-12',
    fare: 200.00
  },
  validTrip3: {
    bus_id: 1,
    origin: 'Oshodi',
    destination: 'Berger',
    trip_date: '2019-08-01',
    fare: 200.00
  },
  validTrip4: {
    bus_id: 1,
    origin: 'Oshodi',
    destination: 'Mile 2',
    trip_date: '2019-09-20',
    fare: 200.00
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
    trip_id: 10,
    seat_number: 6
  }
}

export { authTestData, tripTestData, bookingTestData };
