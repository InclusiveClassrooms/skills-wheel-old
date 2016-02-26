# Inclusive Classrooms Skills Wheel

[![Circle CI](https://circleci.com/gh/InclusiveClassrooms/skills-wheel/tree/master.svg?style=shield)](https://circleci.com/gh/InclusiveClassrooms/skills-wheel/tree/master)

This is a @dwyl project being taken on by @danwhy & @jbarget.
We will be making a digital form of the Teaching Assistant's (TA) skills wheel created by Inclusive Classrooms. Our workflow will be represented in the issues we create/close and the labels we use.

There are 3 parts to the project:

1. Main Page
  - inputs for child information
  - questions for TA to answer as a form

2. Skills Wheel
  - representing the TA's answers in the skills wheel

3. Data Collection
  - storing the data in Redis
  - sending the data to a google spreadsheet

We also hope to be able to integrate our work with the current Inclusive Classrooms website

## Testing

Frontend Tests are written with Qunit, and are being run on PhantomJS for continuous integration with Circle-CI. Backend tests are written with Tape. Code coverage is currently provided by blanketjs. We're working on getting this integrated with Circle.

To see the coverage report for the frontend code, host a simple server in: `python -m SimpleHTTPServer` and go to _localhost:8000/test/test.html_
Make sure the 'Enable Coverage' box is ticked.

## The Wheel

The Skills Wheel has been created using D3. All code for this is in _public/wheel.js_ and is commented for clarity.

## Data

When the form is submitted, the data is sent to a [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1RFbpnk-ZoU87S_FiIphw74Y1cgz1dHyOMIvr0dJOzPQ/edit#gid=0) and a Redis database.

#### Redis

The redis database is structured as follows:
```
School: {
  TA: {
    Group: {
      Student: {
        Date: [{question, answer}...]
      }
    }
  }
}
```
This may need to be restructured in future sprints when the exact use of the data is finalised.

## File Structure
```
|-README.md
|-package.json
|-circle.yml
|
|-assets
|
|-lib
| |-api.js
|
|-public
| |-index.html
| |-index.js
| |-wheel.js
|
|-test
  |-fixtures
  |
  |-blanket.js
  |-index.test.js
  |-server.test.js
  |-test.html
```
