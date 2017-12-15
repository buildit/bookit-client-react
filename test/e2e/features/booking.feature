Feature: Booking a resource
  Scenario: Booking a room
    Given I am on the bookit website form
    And I fill in the form
    When I create my booking
    Then It's booked

  Scenario: Booking a room that is already booked
    Given I am on the bookit website form
    And I fill in the form
    And I create my booking
    Given I am on the bookit website form
    When I fill in the form
    Then I cannot select the same room
