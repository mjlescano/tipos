Feature: Define function types

As a developer using "tipos"
I want to define the types of arguments and return values of my functions
So that I can be sure to use them correctly

Scenario: Argumentless function correctly called
Given a function that takes nothing
And returns nothing
When called with no arguments
Then it returned nothing

Scenario: Argumentless function wrongly called
Given a function that takes nothing
And returns nothing
When called with (1)
Then it threw InvalidArgumentValueError

Scenario: Function that takes arguments and is correctly called
Given a function that takes (String, Number)
And returns nothing
When called with ("Hello", 2)
Then it returned nothing

Scenario: Function that takes arguments and is wrongly called
Given a function that takes (String, Number)
And returns nothing
When called with (2)
Then it threw InvalidArgumentValueError
