describe('Login E2E spec', () => {
  it('should have a login form [EN]', () => {
    cy.visit('http://localhost:3000/en');

    cy.get('header.page__header button[data-cy="btn-log-in"]').should('have.text', "Log in");
    cy.get('header.page__header button[data-cy="btn-sign-up"]').should('have.text', "Sign up");

    // cy.get('h1[data-cy="title"]').should('have.text', "Login");
    // cy.get('label[data-cy="email-label"]').should('have.text', "Email");
    // cy.get('input[data-cy="email-input"]').should('have.value', "");
    // cy.get('input[data-cy="email-input"][placeholder]').should('have.value', "");
    // cy.get('label[data-cy="password-label"]').should('have.text', "Password");
    // cy.get('input[data-cy="password-input"]').should('have.value', "");
    // cy.get('input[data-cy="password-input"][placeholder]').should('have.value', "");
    // cy.get('button[data-cy="submit-button"]').should('have.text', "Log in");

    // cy.get('input[data-cy="email-input"]').type('test1@example.com').should('have.value', "test1@example.com");
    // cy.get('input[data-cy="password-input"]').type('123456').should('have.value', "123456");
    // cy.get('button[data-cy="submit-button"]').click();
  })

  // it('should have a login form [RU]', () => {
  //   cy.visit('http://localhost:3000/ru');

  //   cy.get('header.header button[data-cy="btn-log-in"]').should('not.exist');
  //   cy.get('header.header button[data-cy="btn-sign-up"]').should('have.text', "Регистрация");

  //   cy.get('h1[data-cy="title"]').should('have.text', "Авторизоваться");
  //   cy.get('label[data-cy="email-label"]').should('have.text', "Електронная почта");
  //   cy.get('input[data-cy="email-input"]').should('have.value', "");
  //   cy.get('label[data-cy="password-label"]').should('have.text', "Пароль");
  //   cy.get('input[data-cy="password-input"]').should('have.value', "");
  //   cy.get('button[data-cy="submit-button"]').should('have.text', "Авторизоваться");
  // })

  // it('should have a login form [UA]', () => {
  //   cy.visit('http://localhost:3000/ua');

  //   cy.get('header.header button[data-cy="btn-log-in"]').should('not.exist');
  //   cy.get('header.header button[data-cy="btn-sign-up"]').should('have.text', "Реєстрація");

  //   cy.get('h1[data-cy="title"]').should('have.text', "Вхід");
  //   cy.get('label[data-cy="email-label"]').should('have.text', "Електронна пошта");
  //   cy.get('input[data-cy="email-input"]').should('have.value', "");
  //   cy.get('label[data-cy="password-label"]').should('have.text', "Пароль");
  //   cy.get('input[data-cy="password-input"]').should('have.value', "");
  //   cy.get('button[data-cy="submit-button"]').should('have.text', "Увійти");
  // })
})