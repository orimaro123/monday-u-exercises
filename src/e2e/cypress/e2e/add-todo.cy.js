describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should add a new todo using button click", () => {
    const itemText = "A regular task using btn";
    cy.get("#list-item-input").type(itemText);
    cy.get("#list-item-submit").click();
    cy.get("#clear-all-button").should("be.visible");
  });

  it("Should add a new regular task using the enter key", () => {
    const itemText = "Add task using enter key";

    cy.get("#list-item-input").type(itemText).type("{enter}")
    cy.get(".list-item.flex").should("be.visible");
    cy.get("#list").should("be.visible");
   
    cy.get("#clear-all-button").click()

  });
});
