# Inclusive Classrooms Skills Wheel

[![Build Status](https://travis-ci.org/InclusiveClassrooms/skills-wheel.svg?branch=master)](https://travis-ci.org/InclusiveClassrooms/skills-wheel)

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

## File Structure
```
|-README.md
|
|-lib
| |-api.js
|
|-public
| |-bundle.js
| |-index.html
|
|-src
| |-index.js
|
|-test
  |-index.test.js
```
