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

Tests are written with Qunit, and are being run on PhantomJS for continuous integration with Circle-CI. Code coverage is currently provided by blanketjs. We're working on getting this integrated with Circle.

## The Wheel

The Skills Wheel has been created using D3. All code for this is in `public/wheel.js` and is commented for clarity.

## File Structure
```
|-README.md
|-package.json
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
  |-blanket.js
  |-index.test.js
  |-test.html
```
