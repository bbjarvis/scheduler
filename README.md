# Interview Scheduler Project

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer.

When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Final Product
This is the Default View (Monday) when loading the app.
The left side shows all available days, and Spots Remaining for that day.
The main shows all the appointments for that day:
!["Default"](https://github.com/bbjarvis/scheduler/blob/master/docs/Default%20View.png)

Click on a (+) icon to Create Appointment for that time slot:
!["Create"](https://github.com/bbjarvis/scheduler/blob/master/docs/Create%20Appointment.png)

After filling in the Student Name and selecting an Interviewer the user can select "Cancel" to go back, or "Save"
!["Save"](https://github.com/bbjarvis/scheduler/blob/master/docs/Save.png)

Once created, selecting the Edit Appointment will take the user back to the Create Appointment:
!["Edit"](https://github.com/bbjarvis/scheduler/blob/master/docs/Edit.png)

Selecting Delete Appointment:
!["Delete"](https://github.com/bbjarvis/scheduler/blob/master/docs/Deleting.png)

Will bring the user to Confirm:
!["Confirm"](https://github.com/bbjarvis/scheduler/blob/master/docs/Confirm%20Delete.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
