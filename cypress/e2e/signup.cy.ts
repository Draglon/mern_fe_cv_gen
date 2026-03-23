describe('Signup E2E spec', () => {
  it('should have a Signup form [EN]', () => {
    cy.visit('http://localhost:3000/en/registration');

    cy.get('header.page__header button[data-cy="btn-log-in"]').should('have.text', "Log in");
    cy.get('header.page__header button[data-cy="btn-sign-up"]').should('have.text', "Sign up");

    // cy.get('h1[data-cy="title"]').should('have.text', "Sign up");
    // cy.get('label[data-cy="email-label"]').should('have.text', "Email");
    // cy.get('input[data-cy="email-input"]').should('have.value', "");
    // cy.get('input[data-cy="email-input"][placeholder]').should('have.value', "");
    // cy.get('label[data-cy="password-label"]').should('have.text', "Password");
    // cy.get('input[data-cy="password-input"]').should('have.value', "");
    // cy.get('input[data-cy="password-input"][placeholder]').should('have.value', "");
    // cy.get('button[data-cy="submit-button"]').should('have.text', "Sign up");

    // cy.get('input[data-cy="email-input"]').type('test1@example.com').should('have.value', "test1@example.com");
    // cy.get('input[data-cy="password-input"]').type('123456').should('have.value', "123456");
    // cy.get('button[data-cy="submit-button"]').click();
  })

  // it('should have a login form [RU]', () => {
  //   cy.visit('http://localhost:3000/ru/registration');
 
  //   cy.get('header.header button[data-cy="btn-log-in"]').should('have.text', "Авторизоваться");
  //   cy.get('header.header button[data-cy="btn-sign-up"]').should('not.exist');

  //   cy.get('h1[data-cy="title"]').should('have.text', "Регистрация");
  //   cy.get('label[data-cy="email-label"]').should('have.text', "Електронная почта");
  //   cy.get('input[data-cy="email-input"]').should('have.value', "");
  //   cy.get('label[data-cy="password-label"]').should('have.text', "Пароль");
  //   cy.get('input[data-cy="password-input"]').should('have.value', "");
  //   cy.get('button[data-cy="submit-button"]').should('have.text', "Регистрация");
  // })

  // it('should have a login form [UA]', () => {
  //   cy.visit('http://localhost:3000/ua/registration');

  //   cy.get('header.header button[data-cy="btn-log-in"]').should('have.text', "Увійти");
  //   cy.get('header.header button[data-cy="btn-sign-up"]').should('not.exist');

  //   cy.get('h1[data-cy="title"]').should('have.text', "Реєстрація");
  //   cy.get('label[data-cy="email-label"]').should('have.text', "Електронна пошта");
  //   cy.get('input[data-cy="email-input"]').should('have.value', "");
  //   cy.get('label[data-cy="password-label"]').should('have.text', "Пароль");
  //   cy.get('input[data-cy="password-input"]').should('have.value', "");
  //   cy.get('button[data-cy="submit-button"]').should('have.text', "Реєстрація");
  // })
})