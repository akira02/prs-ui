# API Documentation

* Test Environment
I have set up test environment at http://prs-node.herokuapp.com/

## User
### List all users
* Method & Path

  GET `/users/`

* Header

  `none`

* Params

  `none`

### Login

* Method & Path

  POST `/users/login`

* Header

  `none`

* Params

  `name=[string], password=[string]`

  You can use name=test and password=123123 to test

----
## Assignment
### List all assignments
* Method & Path

  GET `/assignments/`

* Header

  `none`

* Params

  `token=[string]`

### Create Assignment
* Method & Path

  POST `/assignments/`

* Header

  `none`

* Params

  `name=[string], data_link=[string]`