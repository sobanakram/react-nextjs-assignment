# React Assignment

Built with the MERN stack (MongoDB, Express, React and NodeJS).

## react-nextjs-assignment

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Client](#client)
  - [Server](#server)
  - [Database](#database)
- [Configuration and Setup for Frontend](#configuration-and-setup-frontend)
- [Configuration and Setup for Backend](#configuration-and-setup-backend)
- [Important Note](#notes)

## Introduction

Summary:
The goal of the project is to implement a task focused primarily on frontend functionality. It consists of a sign-in screen, after which the user is taken to a dashboard where they can add, edit, and view a list of movies..

## Key Features

- User with credentials can login and view movies.
- User will be able to add/edit movies.
- User will be able to logout.

## Technologies used

This project was created using the following technologies.

#### Client

- React JS
- React-router-dom (To handle routing)
- Axios (for making api calls)
- CSS & SCSS (for User Interface)

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- Nodemailer (for sending email)

#### Database

MongoDB (MongoDB Atlas)

## Configuration and Setup for Frontend

In order to run this project locally, clone the repository.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)

In the terminal first go to cloned project folder.

```
cd Frontend
```

- create a .env file in the root of your project directory.
- add your own credentials like below

```
VITE_BASE_URL_BACKEND=http://localhost:4001
VITE_API_ENDPOINT=http://localhost:4001/api/v1
```

- Install require packages

```
npm install
npm run dev
```

## Configuration and Setup for Backend

In order to run this project locally, clone the repository.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)

In the terminal first go to cloned project folder.

```
cd Backend
```

- create a .env file in the root of your project directory.
- add your own credentials like below

```
PORT=4001
MONGO_URI=mongodb://localhost:27017/movies-task
JWT_TOKEN_KEY=
TOKEN_EXPIRATION_TIME=
# optional 
USER_EMAIL=
USER_PASSWORD=
```

- Install require packages

```
npm install
npm start
```

## Important Notes

You may ask for the credentials for the login


