/*
NB: extra comments than usual were left in the test to show my process and some failed attempts.
*/

describe("Login spec", () => {
  beforeEach(() => {
    // cy.visit("https://topset-dev.vercel.app/login");
    cy.visit("/login");
  });

  it("Successfully opens the page", () => {
    // Confirm page loads successfully
    // cy.visit("https://topset-dev.vercel.app/login");

    // Confirm loaded page was indeed the login page
    // cy.contains("h2", "Log In");
    // cy.findByRole("heading", { name: /log in/i });
    cy.contains("h2", /log in/i);
  });

  it("Successful login with valid credentials", () => {
    // cy.visit("https://topset-dev.vercel.app/login");

    cy.get("input[name='email']").type("qa.analyst@email.com");
    cy.get("input[name='password']").type("Password123!");
    cy.get("button[type='submit']").click();

    cy.url().should("eq", "https://topset-dev.vercel.app/");
  });

  it("Unsuccessful login with invalid details", () => {
    const invalidEmail = "blahblah@example.com";
    const invalidPassword = "password";

    cy.get("input[name='email']").type(invalidEmail);
    cy.get("input[name='password']").type(invalidPassword);

    cy.get("button[type='submit']").as("submitButton");

    cy.get("@submitButton").click();
    cy.get("@submitButton").siblings("p").contains("Invalid login details");
  });

  it("Unsuccessful login with invalid email", () => {
    const invalidEmail = "blahblah@example.com";

    cy.get("input[name='email']").type(invalidEmail);
    cy.get("input[name='password']").type("Password123!{enter}");

    cy.get("button[type='submit']")
      .siblings("p")
      .contains("Invalid login details");
  });

  it("Unsuccessful login with invalid password", () => {
    const invalidPassword = "password";

    cy.get("input[name='email']").type("qa.analyst@email.com");
    cy.get("input[name='password']").type(invalidPassword);

    cy.get("button[type='submit']").as("submitButton");

    cy.get("@submitButton").click();
    cy.get("@submitButton").siblings("p").contains("Invalid login details");
  });

  it("Notifies when email field is empty", () => {
    cy.get("input[name='email']").as("emailField");

    // Focus email field
    cy.get("@emailField").click();

    // Unfocus email field by clicking anything else besides the submit button
    cy.get("input[name='password']").click();

    cy.get("@emailField").siblings("p").contains("Email is required");
  });

  it("Notifies when email content is not a valid email", () => {
    const invalidEmail = "invalidEmail";
    cy.get("input[name='email']").as("emailField");

    cy.get("@emailField").type(invalidEmail);

    // Unfocus email field by clicking anything else besides the submit button
    cy.get("input[name='password']").click();

    cy.get("@emailField").siblings("p").contains("Must be a valid email");
  });

  it("Notifies when password field is empty", () => {
    cy.get("input[name='password']").as("passwordField");

    // Focus password field
    cy.get("@passwordField").click();

    // Unfocus password field by clicking anything else besides the submit button
    cy.get("input[name='email']").click();

    cy.get("@passwordField").siblings("p").contains("Password is required");
  });

  it("Notifies when password is less than 8 characters", () => {
    const shortPassword = "pass";
    cy.get("input[name='password']").as("passwordField");

    // Focus password field
    cy.get("@passwordField").type(shortPassword);

    // Unfocus password field by clicking anything else besides the submit button
    cy.get("input[name='email']").click();

    cy.get("@passwordField")
      .siblings("p")
      .contains("password must be at least 8 characters");
  });

  // Extra tests
  it("Has a link to Sign in page", () => {
    cy.get("a[href='/student-email-signup']").contains(/Sign Up/i);
  });
  it("Has a forgot-passoword link", () => {
    cy.get("a[href='/forgot-password']").contains(/Forgot password ?/i);
  });
});
