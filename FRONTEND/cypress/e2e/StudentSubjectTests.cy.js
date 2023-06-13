import { wait } from "@testing-library/user-event/dist/utils";

describe("Student page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // component is running on localhost:3000
  });

  it("One of the input is consist only from white spaces!", () => {
    cy.wait(2000);
    // Click the Add New Student button
    cy.get(".addButtonCrud").click();

    // Verifică că pop-up-ul de confirmare a apărut și apasă pe butonul "OK"
    cy.on("window:alert", (text) => {
      expect(text).to.equal("One of the input is consist only from white spaces!"); // Verificați textul mesajului de confirmare

    });
  });
  it("Age is not a number", () => {
    cy.wait(2000);
    // Fill in the input fields
    cy.get('.inputNameCrud[placeholder="First Name"]').type("John");
    cy.get('.inputNameCrud[placeholder="Last Name"]').type("Doe");
    cy.get('.ageCrud[placeholder="Age"]').type("m");
    cy.get('.isBudgetCrud input[type="checkbox"]').check();

    // Click the Add New Student button
    cy.get(".addButtonCrud").click();

    // Verifică că pop-up-ul de confirmare a apărut și apasă pe butonul "OK"
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Age is not a number"); // Verificați textul mesajului de confirmare

    });
  });

  it("Names can not contain numbers", () => {
    cy.wait(2000);
    // Fill in the input fields
    cy.get('.inputNameCrud[placeholder="First Name"]').type("1John");
    cy.get('.inputNameCrud[placeholder="Last Name"]').type("Doe");
    cy.get('.ageCrud[placeholder="Age"]').type("20");

    // Click the Add New Student button
    cy.get(".addButtonCrud").click();

    // Verifică că pop-up-ul de confirmare a apărut și apasă pe butonul "OK"
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Names can not contain numbers"); // Verificați textul mesajului de confirmare

    });
  });
  it("should add a new student", () => {
    cy.wait(2000);
    // Fill in the input fields
    cy.get('.inputNameCrud[placeholder="First Name"]').type("John");
    cy.get('.inputNameCrud[placeholder="Last Name"]').type("Doe");
    cy.get('.ageCrud[placeholder="Age"]').type("20");
    cy.get('.isBudgetCrud input[type="checkbox"]').check();

    // Click the Add New Student button
    cy.get(".addButtonCrud").click();
    cy.wait(5000);

    // Check if the student is added to the table
    cy.contains("John").should("exist");
    cy.contains("Doe").should("exist");
    cy.contains("20").should("exist");
    cy.contains("YES").should("exist");
  });

  it("should edit a student", () => {
    // Click the Edit button of the first student in the table
    cy.wait(5000);
    cy.get(".btnEdit").first().click();

    cy.wait(1000);
    // Modify the student's data
    cy.get(".editInput").eq(0).clear().type("Jane");
    cy.get(".editInput").eq(1).clear().type("Smith");
    cy.get(".editInput").eq(2).clear().type("25");
    cy.get('.editCheckbox input[type="checkbox"]').check();

    cy.wait(1000);
    // Click the Save Changes button
    cy.get('.modal-footer').contains('Save Changes').click();

    cy.wait(3000);
    // Check if the student's data is updated in the table
    cy.contains("Jane").should("exist");
    cy.contains("Smith").should("exist");
    cy.contains("25").should("exist");
    cy.contains("YES").should("exist");
  });

  it("should delete a student", () => {
    // Get the count of rows before deletion
    cy.get("tbody tr").its("length").as("initialRowCount");

    // Click the Delete button of the first student in the table
    cy.get(".btnDelete").first().click();

    // Confirm the deletion
    cy.on("window:confirm", () => true);

    // Check if the student is removed from the table
    cy.get("@initialRowCount").then((initialRowCount) => {

      // Verify that the row count decreased by 1
      cy.wait(5000);
      cy.get("tbody tr").should("have.length", initialRowCount - 1);
    });
  });

  it("should navigate to the Subjects page when the button is clicked", () => {

    wait(10000);
    // Click the button
    cy.get('.btnSubject').first().click();

    // Verify if the page is loaded correctly
    cy.url().should("include", "/Subjects");
  });
});

describe("Subjects Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    wait(10000);
    // Click the button
    cy.get('.btnSubject').first().click();

    // Verify if the page is loaded correctly
    cy.url().should("include", "/Subjects");
  });

  it("should select a subject from the dropdown", () => {
    cy.get("#dropdown-split-basic").click();// Clicking on the dropdown button
    cy.wait(1000);
    cy.contains('Introduction to Computer Science').click();

    cy.get(".dropDownSubjectForm")
      .should("have.value", "Introduction to Computer Science"); // Verifying that the selected subject is displayed in the dropdown input
  });

  it("should select a mark from the dropdown", () => {
    cy.get("#dropdown-split-basic1").click();// Clicking on the dropdown button
    cy.wait(1000);
    cy.contains(1).click();

    cy.get(".dropDownMarkForm")
      .should("have.value", 1); // Verifying that the selected mark is displayed in the dropdown input
  });

  it("should add a new subject", () => {
    const newSubjectName = "Introduction to Computer Science";
    const newMark = 1;

    cy.get("#dropdown-split-basic").click({ force: true }); // Clicking on the subject dropdown
    cy.contains(newSubjectName).click(); // Selecting the new subject

    cy.get("#dropdown-split-basic1").click({ force: true }); // Clicking on the mark dropdown
    cy.contains(newMark).click(); // Selecting the mark

    cy.get(".addButton").click(); // Clicking on the "Add New Subject" button

    // Verifying that the new subject is added to the list
    cy.contains(newSubjectName)
  });

  it("cannot add a subject with the same name", () => {
    const newSubjectName = "Introduction to Computer Science";
    const newMark = 1;

    cy.get("#dropdown-split-basic").click({ force: true }); // Clicking on the subject dropdown
    cy.contains(newSubjectName).click(); // Selecting the same subject

    cy.get("#dropdown-split-basic1").click({ force: true }); // Clicking on the mark dropdown
    cy.contains(newMark).click(); // Selecting the mark


    cy.on("window:confirm", () => true);

    cy.get(".addButton").click(); // Clicking on the "Add New Subject" button



    // Verifică că pop-up-ul de confirmare a apărut și apasă pe butonul "OK"
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Subject already exist in database"); // Verificați textul mesajului de confirmare

    });
  });


  it("cannot add a subject with default options", () => {
    const newSubjectName = "Subject Name";
    const newMark = "Subject Mark";

    cy.get("#dropdown-split-basic").click({ force: true }); // Clicking on the subject dropdown
    cy.contains(newSubjectName).click(); // Selecting the same subject

    cy.get("#dropdown-split-basic1").click({ force: true }); // Clicking on the mark dropdown
    cy.contains(newMark).click(); // Selecting the mark

    cy.on("window:confirm", () => true);

    cy.get(".addButton").click(); // Clicking on the "Add New Subject" button



    // Verifică că pop-up-ul de confirmare a apărut și apasă pe butonul "OK"
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Subject Name not choosed or Mark not choosed"); 
    });


  });

  it('should update subject data on Save Changes button click', () => {
    cy.get('.SubjectsCardDiv')
      .find('button')
      .contains('Edit')
      .click();

    cy.get('.modal-dialog')
      .find('.dropdown-toggle-split')
      .click();

    cy.get('.dropdown-menu')
      .contains('5') 
      .click();

    cy.get('.modal-dialog')
      .find('button')
      .contains('Save Changes')
      .click();
  });

  it('should delete subject on Delete Subject button click', () => {
    cy.get('.SubjectsCardDiv')
      .find('button')
      .contains('Delete Subject')
      .click();

    cy.on('window:confirm', () => true);
  });
});