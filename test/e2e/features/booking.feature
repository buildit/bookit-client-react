Feature: Booking a resource
  Scenario: Booking a room
    Given I am on the bookit website form
    When I book a room
    Then It's booked

  Scenario: Booking a room that is already booked
    Given I am on the bookit website form
    And I book a room
    When I book a room
    Then It fails
