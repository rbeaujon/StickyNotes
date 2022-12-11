# StickyNotes

This repository is developed in 2 modules BE and FE.
Each of them BE (Back-End) and FE (Front-End) have their own installation packages under NPM.

## Technical details

The FE module was developed using REACT, Typescript and CSS
The BE module is based on NodeJS using the ExpressJS framework.

<img src="/assets/documentation/diagram.png" width="80%">

## Views

<img src="/assets/images/login.png" width="70%">

<img src="/assets/images/stickers.png" width="100%">

### npm run +

    start: Run this script to execute the development server available for your React application.
    test:  In order to run the testing mode, using react-scripts: 5.0.1
    build: This sets and creates a build directory with a production build of your app

#### Browser views

FE [http://localhost:3000]

BE [http://localhost:3001]

## API Endpoints

[http://localhost:3001]

### GET /stickers

#### Parameters
 
 * No parameters

#### Responses

* Status Code: 200
* Media type: application/json
* Schema :
 ```
 {
     sticker: string;
     color: string;
     position: {
         x: number;
         y: number;
     };
     note: string;
     user: string;
 }
 ```

### POST /stickers

#### Parameters

* Request body
* Media type: application/json
* Schema :
 ```
 {
     sticker: string;
     color: string;
     position: {
         x: number;
         y: number;
     };
     note: string;
     user: string;
 }
 ```

#### Responses

* Status Code: 201
* Status Description: "Stickers saved successfully"


## Out of scope
  
    * More elegant UI.
    * Design for Mobile.
    * Improve error detection
 	* More Unit Testing
 	* Add another modal pop to record the note instead to use an input prompt.
