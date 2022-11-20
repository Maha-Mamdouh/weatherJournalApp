![Alt Text](/banner.gif)
# Weather-Journal App Project

Displaying the weather based on the entered zip code or based on chosen country code and the city name is the main idea of the current application.

## Demo-Preview
 ![Alt Text](/demo.gif)

# Project



## Table of contents

- [Weather-Journal App Project](#Weather-Journal-App-Project)
    - [Demo-Preview](#Demo-Preview)
    - [Table of contents](#table-of-contents)
    - [Installation](#Installation)
    - [Usage](#Usage)
    - [Development](#Development)


## Installation

[(Back to top)](#table-of-contents)

To use this project, first install express framework, body parsing middleware, CORS package using the following npm install commands:
* $  npm install express
* $  npm install body-parser
* $  npm install cors 

## Usage

[(Back to top)](#table-of-contents)

To display the current weather, you can write a zip code (for USA only) or check the "other countries" checkbox to be able to select a country code and a city name from the provided lists.

## Development

[(Back to top)](#table-of-contents)

The main files of this project are:
* <strong>A server.js</strong> file which consist of:
    - Create the app and install Middleware.
    -  Spin up the server.
    - Callback function to complete GET.
    - Callback function to complete POST.
* <strong>website</strong> folder with the following files:
    *   An <strong>app.js</strong> file which consist of:
        -  showing/hiding div elements by listeing to checkbox element.
        - Creating Countries and corresponding cities lists.
        - Based on the user's choice, the data is obtained and the information is extracted and shown on the screen.
    * <strong>index.html</strong> that formats the structure of the applicayion.
    * <strong>style.css</strong> which is used to format the layout of our  application.
* <strong>city.list.json</strong>: a file provided by https://openweathermap.org/  containing a list of <em>cities name, state, country anf the corresponding cooreinates</em>.
