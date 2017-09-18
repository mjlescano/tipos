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

Scenario: Argumentless function that returns a wrong value
Given a function that takes nothing
And returns String
When called with no arguments
And returns value of type Number
Then it threw InvalidReturnValueError

Scenario: Function that takes arguments and correctly called
Given a function that takes (String, Number)
And returns nothing
When called with ("Hello", 2)
Then it returned nothing

Scenario: Function that takes arguments and wrongly called
Given a function that takes (String, Number)
And returns nothing
When called with (2)
Then it threw InvalidArgumentValueError

Scenario: Function with optional arguments called correctly
Given a function that takes (String, Number?)
And returns nothing
When called with ("Some string", 25)
Then it returned nothing

Scenario: Function with optional arguments called correctly without optional
Given a function that takes (String, Number?)
And returns nothing
When called with ("Some string")
Then it returned nothing

Scenario: Function with optional arguments and wrongly called
Given a function that takes (String, Number?)
And returns nothing
When called with ("Some string", "Another String")
Then it threw InvalidArgumentValueError

Scenario: Function with multi type argument called correctly
Given a function that takes (String|Number)
And returns nothing
When called with ("Some string")
Then it returned nothing

Scenario: Function with multi type argument called correctly
Given a function that takes (String|Number)
And returns nothing
When called with (342)
Then it returned nothing

Scenario: Function with multi type argument wrongly correctly
Given a function that takes (String|Number)
And returns nothing
When called with ({})
Then it threw InvalidArgumentValueError
