describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should find day that contains 'Tuesday' and click", () => {
    cy.contains("li", "Tuesday").click()
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  })

});