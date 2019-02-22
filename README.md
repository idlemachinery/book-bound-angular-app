# Book-Bound Client Application

This project is an [Angular CLI](https://angular.io) client application for use with the Book-Bound API Challenge.

The client has an [angular-in-memory-web-api](https://github.com/angular/in-memory-web-api) for development purposes.  The goal is to create APIs using other backend technology.

## Book-Bound API Challenge

[The API Challenge](https://idlemachinery.com/io/the-api-challenge/) involves creating the same API with book and author endpoints using as many different implementations as possible.

## Installing the application

Download the project from GitHub.  Run `npm install` to install package dependencies.

## Running the application

Run `npm start` for a dev server. The server uses a proxy so you cannot simply run `ng serve`. You will need to start your API on `http://localhost:3000` to run concurrently with the client. See the 'API Endpoints' section below for more information.

Run `npm run start-in-memory` for a dev server with an in-memory web API.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### API endpoints

If you are developing an API to use with the client it must have the following endpoints:

* `http://localhost:3000/api/books`
* `http://localhost:3000/api/authors`

Look in the `src\app\shared\interfaces.ts` for the `Book` and `Author` type definitions.
