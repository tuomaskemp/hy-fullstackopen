describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'john',
      password: 'passwd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.get('#username').type('test')
    cy.get('#password').type('test')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'john', password: 'passwd' })
      cy.contains('john logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('john')
      cy.get('#password').type('wrongpasswd')
      cy.get('#submit').click()
      cy.get('.notification-banner').should('contain', 'Login failed')
      cy.get('.notification-banner').should('have.css', 'background-color', 'rgb(217, 83, 79)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'john', password: 'passwd' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit').click()
      cy.get('.blogs-list').should('contain', 'test title test author')
    })
    it('A blog can be liked', function() {
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 0 })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('.like-count').should('contain', 'Likes: 1')
    })
    it('A blog can be removed', function() {
      cy.createBlog({ title: 'test title', author: 'author1', url: 'url1', likes: 200 })
      cy.contains('view').click()
      cy.contains('remove blog').click()
      cy.get('.notification-banner').should('contain', 'test title removed')
      cy.get('.notification-banner').should('have.css', 'background-color', 'rgb(92, 184, 92)')
    })
    it('Blogs are sorted by like count', function() {
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 200 })
      cy.createBlog({ title: 'title2', author: 'author2', url: 'url2', likes: 20 })
      cy.createBlog({ title: 'title3', author: 'author3', url: 'url3', likes: 40 })
      cy.createBlog({ title: 'title4', author: 'author4', url: 'url4', likes: 60 })
      cy.get('.blogs-list').find('div').first().should('contain', 'title1 author1')
    })
  })
})