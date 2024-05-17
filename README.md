# Contract managing app

This is a contract managing app made in React and Typescript, styled with Material-UI and state managed by Zustand. This app allows the user to view a list of contracts, edit them, filter them, add a new contract and view details about selected contract along with related items. The data is fetched from a dummy API.

## Features

* List contracts fetched from a dummy API
* Filter them by `Kupac` (buyer) and `Status`
* Add a new contract
* Edit an existing contract
* Delete an existing contract
* View contract details
* View items related to a contract 

## How to run

* Clone the repository or download the ZIP file.
* Inside the downloaded folder open a Node.js command prompt.
* Run `npm install` to install all the dependencies required for running this project.
* Run `npm start` to launch the web app locally in your browser at [http://localhost:3000](http://localhost:3000).

## What I used

* `create-react-app`
* `zustand` 
* `material-ui`
* `typescript`
* `react-i18n`
* `mockAPI`

## TO-DO - what should be implemented to make the app production-ready 

The following features are what I consider should be implemented to make the app easier to use, scale better and be production ready. 

* Build the app and host it
* ~~Replace the dummy API with a real API and implement better fetching and error handling~~
* Implement authorization
* Implement caching (for example once the details about one contract have been fetched from the store, cache the data for a short while if the user accidentaly navigates away from the page)
* ~~Add pagination and display only few contracts on each page~~
* Replace every date input field in edit and add forms with date picker for convinience 
* ~~Add a language support for both English and Croatian~~
* Refactor the code and break the components down even further
* Create a folder for each customized UI component so that they can be reused in multiple components as the app grows
* ~~Add images for items~~

