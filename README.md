# Home Harmony
#### An app that effectively manages communication, tasks and expenditures between roommates.
http://homeharmony.herokuapp.com/

## Team

  - __Product Owner__: [Evan](https://github.com/MetaEvan)
  - __Scrum Master__: [Femi](https://github.com/femi-saliu)
  - __Development Team Members__: [Melinda](https://github.com/melindabernrdo), [Thomas](https://github.com/tgreenhalgh)



## Usage

1. Create an account on the login page
    1. You need to create an account for each member of your household
2. Using the 'Manage House' menu, have one member create a new house, and have the other members join that house
3. Now you can start adding tasks, expenses, compliments & concerns which all of your housemates can see

## Requirements

- AngularJS ~1.4.3
- Firebase ~2.2.9
- Angular-UI-Router ~0.2.15
- Angular-Messages ~1.4.3

## Development

### Installing Dependencies

From within the root directory:

```sh
(sudo) npm install -g bower
bower install
```

### Frontend

```
├── app.js
├── auth
│   ├── auth.js
│   ├── login.html
│   ├── loginController.js
│   ├── newUser.html
│   └── newUserController.js
├── dash
│   ├── dash.html
│   ├── dash.js
│   └── partials
│       ├── default.html
│       ├── defaultController.js
│       ├── newHouse.html
│       └── newHouseController.js
├── expenses
│   ├── expenses.html
│   └── expensesController.js
├── issues
│   ├── issues.html
│   └── issues.js
├── landing
│   └── landing.html
├── tasks
│   ├── tasks.html
│   └── tasksController.js
└── util
    └── util.js
```
* app.js - Ties all of the modules together and also handles all of the routing between states
* The Auth folder contains the html and js that handles all of the user authentication
  * auth.js - Contains the reference to our firebase database and functions that authenticate users
  * loginController.js - Uses the functions in auth.js to let the user log in
  * newUserController.js - Uses the functions in auth.js to create new users
* The dash folder contains all of the html and js that creates the dashboard on the main page of the application
  * The dashboard contains a template that is filled with the html for whichever feature that the user is currently using.
  * default.html & defaultController.js - Contain the default template for the dashboard which gives an overview of the status of the house.
  * newHouse.html & newHouseController.js - Contains the template for the 'Manage House' feature
* The expenses folder contains all of the code that creates the expenses feature of the application
  * expensesController.js - Contains db interaction and data visualization for user expenses
* The issues folder contains all of the code that creates the issues feature of the application
  * issues.js - Contains db interaction for 'Compliments and Concerns'
* The tasks folder contains all of the code that creates the tasks feature of the application
  * tasks.js - Contains db interaction for user tasks

### Backend

One major design choice we made was to utilize firebase and its backend substitution functionality. This essentially entails storing all of our data, handling user authentication including password encryption and also deployment of our app. This was a smart choice because the user has the same experience but we didnt write any backend code. We only needed to write code that communicates with firebase by telling it how and when to manage our data.

#### Database Schema

* ##### House
  * expenses - An array of all the expenses for the house
  * houseMembers - An array containing the unique id's and email addresses for each member of the house
  * issues - An array containing each issue and its additional information 
  * tasks - An array containing each task and its additional information

* ##### User
  * email - The users email address
  * firstname - The users firstname
  * lastname - The users last name
  * house - The unique id of the users house
  * userExpenses - An array containing each expense that the user needs to pay


### Roadmap

View the project roadmap [here](https://github.com/pleasant-puente/pleasant-puente/issues)


## Contributing

See [CONTRIBUTING.md](https://github.com/pleasant-puente/pleasant-puente/blob/master/docs/CONTRIBUTING.md) for contribution guidelines.
