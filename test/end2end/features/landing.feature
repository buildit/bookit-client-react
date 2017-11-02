Feature: Landing Page
  Scenario: Clicking the Book A Room Button
    Given I am on the landing page of Bookit
    When I click the Book a Room button
    Then I am on the booking form
