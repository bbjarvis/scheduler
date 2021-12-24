describe("Appointments", () => {
  beforeEach(() => {
    // Reset the database
    cy.request("GET", "/api/debug/reset");
    // Go to root
    cy.visit("/");
    // Confimr DOM contains Monday
    cy.contains("Monday");
   });
  it("should book an interview", () => {

    // Find the first Add appointment element and click
    cy.get("[alt=Add]")
      .first()
      .click()
      // Type Lydia Miller-Jones into student name input
      .get("[data-testid=student-name-input]")
      .type('Lydia Miller-Jones')
      // Choose Sylvia Palmer as interviewer
      .get("[alt='Sylvia Palmer']")
      .click()
      // Click Save
    cy.contains("Save").click();
    // Check that the appointment was made
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  });
  it("should edit an interview", () => {

    // Find the edit appointment element and click
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true })
      // clear input, Type Lydia Miller-Jones
      .get("[data-testid=student-name-input]")
      .clear()
      .type('Lydia Miller-Jones')
      // Choose Tori Malcolm as interviewer
      .get("[alt='Tori Malcolm']")
      .click()
      // Click Save
    cy.contains("Save").click();
    // Check that the appointment was made
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Tori Malcolm")
  });
  it("should cancel an interview", () => {

    // Find the Delete appointment element and click
    cy.get("[alt=Delete]")
      .click({ force: true })
      // Click Confirm
    cy.contains("Confirm").click();
    // Check that the appointment was Deleted
    cy.contains("Deleting").should("exist")
    cy.contains("Deleting").should('not.exist')
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")


  });
});