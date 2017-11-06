Feature: Booking a resource
  Scenario: Booking a room
    Given I am on the bookit website form
    When I book a room
    Then It's booked
