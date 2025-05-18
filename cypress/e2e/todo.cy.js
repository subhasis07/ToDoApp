describe('ToDo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
    cy.clearLocalStorage();
  });


  //adding new task

  it('should add a new task', () => {
    cy.get('input[placeholder="Write your TODO"]').type('Buy groceries');
    cy.contains('Add').click();
    cy.contains('Buy groceries').should('exist');
  });


  //marking task completed

  it('should mark a task as completed', () => {
    cy.get('input[placeholder="Write your TODO"]').type('Go running');
    cy.contains('Add').click();
    cy.get('input[type="checkbox"]').check();
    cy.get('span').should('have.class', 'strike');
  });


  //deleting a task

  it('should delete a task', () => {
    cy.get('input[placeholder="Write your TODO"]').type('Learn React');
    cy.contains('Add').click();
    cy.contains('Delete').click();
    cy.contains('Learn React').should('not.exist');
  });


  //editing a task

  it('should edit a task', () => {
    cy.get('input[placeholder="Write your TODO"]').type('Learn Cypress');
    cy.contains('Add').click();
    cy.contains('Edit').click();
    cy.get('input[type="text"]').last().clear().type('Learn Jest');
    cy.contains('Save').click();
    cy.contains('Learn Jest').should('exist');
  });

  //No Emplty task should be accepted
  it('should not add empty tasks', () => {
    cy.get('input[placeholder="Write your TODO"]').type('   ');
    cy.contains('Add').should('be.disabled');
  });
});
