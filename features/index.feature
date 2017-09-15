Feature: Define function types

As a developer using "tipos"
I want to define the types of arguments and return values of my functions
So that I can be sure that I use them correctly

Scenario: Simple function correctly called
Given a function that takes no arguments
And returns undefined
When called with no arguments
Then it returns undefined

Scenario: Simple function wrongly called
Given a function that takes no arguments
And returns undefined
When called with argument 1
Then it throws an InvalidValueError
