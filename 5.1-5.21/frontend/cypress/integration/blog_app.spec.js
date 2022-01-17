Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username: username, password: password
    }).then(({body}) => {
        localStorage.setItem('blogAppUser', JSON.stringify(body))
    })
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addBlog', (title, author, url) => {
    cy.contains('create new blog').click()
    cy.get('#title').clear().type(title)
    cy.get('#author').clear().type(author)
    cy.get('#url').clear().type(url)
    cy.get('#create').click()
})

Cypress.Commands.add('likeBlog', (title) => {
    cy
        .contains(title + ' by:')
        .contains('view').click()
        .parent().contains('like').click()
    cy.contains(title + ' by:').parent().contains('hide').click()  
})

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset/')
        const user = {
            name: 'alex',
            username: 'fuzzydunlop',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        localStorage.removeItem('blogAppUser')
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
        cy.get('#username')
        cy.get('#password')
        cy.get('#login')
    })

    describe('login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('fuzzydunlop')
            cy.get('#password').type('password')
            cy.get('#login').click()
            cy.contains('logged in')
            cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
        })
        it('fails with incorrect credentials', function() {
            cy.get('#username').type('fuzzydunlooop')
            cy.get('#password').type('uhhhhhh')
            cy.get('#login').click()
            cy.should('not.contain', 'logged in')
            cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('while logged in', () =>{
        beforeEach(function() {
            cy.login({ username: 'fuzzydunlop', password: 'password' })
        })

        it('blog can be created', () => {
            cy.addBlog('test title', 'test author', 'test url')
            cy.contains('test title')
        })

        it('blog can be liked', () => {
            cy.addBlog('test title', 'test author', 'test url')
            cy.likeBlog('test title')
        })

        it('blog can be deleted', () => {
            cy.addBlog('test title', 'test author', 'test url')
            cy
                .contains('view').click()
                .parent().contains('delete').click()
            cy.should('not.contain', 'test title')
        })

    })
})