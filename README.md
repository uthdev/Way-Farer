# Way-Farer
WayFarer is a public bus transportation booking server. It is a back-end RESTFUL API.

[![Build Status](https://travis-ci.org/uthdev/Way-Farer.svg?branch=develop)](https://travis-ci.org/uthdev/Way-Farer)
[![Coverage Status](https://coveralls.io/repos/github/uthdev/Way-Farer/badge.svg?branch=develop)](https://coveralls.io/github/uthdev/Way-Farer?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b2830358b09f98ce1f8f/maintainability)](https://codeclimate.com/github/uthdev/Way-Farer/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)


---
## Features
- User can sign up.
- User can login.
- Admin can create a trip.
- Admin can cancel a trip.
- Both Admin and Users can see all trips.
- Users can book a seat on a trip.
- View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.
- Users can delete their booking.
- Users can get a list of filtered trips based on origin.
- Users can get a list of filtered trips based on destination.
- Users can specify their seat numbers when making a booking.

---
## Management
The project development is managed on [Pivotal tracker] https://www.pivotaltracker.com/n/projects/2361200


---

---
## Backend
The api is hosted on [Heroku] https://trip-farer.herokuapp.com/api/v1/


---
## Technologies Used
- [Node.js] 
- [Express.js]
- [ESLint]


---
## Testing Tools
- [Mocha]
- [Chai]
- [NYC]
- [Postman]


---
## API Information
The API is hosted on [Heroku] https://trip-farer.herokuapp.com/api/v1/

METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/api/v1`
POST   | trip        | Create a trip                  |`/api/v1/trips`
PATCH  | trip        | Cancel a trip                  |`/api/v1/trips/:tripId`
GET    | trip        | Get all trips                  |`/api/v1/trips/`
GET    | trip        | Filter same origin trips       |`/api/v1/trips?origin=specifiedOrigin`
GET    | trip        | Filter same destination trips  |`/api/v1/trips?destination=specifiedDestination`
GET    | booking     | Get all bookings               |`/api/v1/bookings`
POST   | booking     | Make booking                   |`/api/v1/bookings`
DELETE | booking     | Delete booking                 |`/api/v1/bookings/bookingId`
POST   | User        | User signup                    |`/api/v1/auth/signup`
POST   | User        | User signin                    |`/api/v1/auth/signin`


---
#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/Way-Farer.git`


#### Setup

- Installing the project's dependencies:

> run the command below

```shell
$ npm install
```

> To start the server, run the command below

```shell
$ npm start
```


---
## Test
- To test the app

> run test using the command below

```shell
$ npm run test
```


---
## Acknowledgements

Andela

---
## Author

Adeleke Gbolahan Uthman
