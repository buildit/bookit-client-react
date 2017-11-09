Feature: Booking a resource
  Scenario: Booking a room
    Given I am on the bookit website form
    When I book a room
    Then It's booked

  Scenario: Booking a room that is already booked
    Given I am on the bookit website form
    When I book a room then try to book it again
    Then It fails
