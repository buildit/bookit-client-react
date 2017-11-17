Feature: Bookings List Feature
  Scenario: Clicking the week forward button
    Given I create a booking for next week
    When I view my bookings and navigate to next week
    Then I see my created booking
