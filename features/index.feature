Feature: Define function types

  As a developer using tipos
  I want to check the types of arguments and return value of my functions when are called
  So that I can be sure that I use them correctly

  Scenario: Calling with no args and no return value
    Given a function that takes no args and returns void
    When called with no args
    Then it should return void

  Scenario: Calling with no args and no return value
    Given a function that takes no args and returns void
    When called with no args
    Then it should return void
