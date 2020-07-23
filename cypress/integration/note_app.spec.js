describe('Note App', function(){
    beforeEach(function(){
        cy.request('POST','http://localhost:3001/api/testing/reset')
        const user= {
            name : 'user1',
            username : 'user1',
            password: 'password1'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('login fails with wrong password', function(){
        cy.contains('log in').click()
        cy.get('#username').type('user1')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error').contains('Wrong Credentials')
        .and('contain', 'Wrong Credentials')
        cy.get('.error').should('have.css', 'color','rgb(255, 0, 0)')
        cy.get('.error').should('have.css','border-style','solid')

        cy.get('html').should('not.contain', 'user1 logged in')

    })
    // it('front page can be opened', function(){
    //     cy.contains('Notes')
    //     cy.contains('Taku')
    // })
    // it('login form can be opened',function(){
    //     cy.contains('log in').click()
    // })
    // it('user can login', function(){
    //     cy.contains('log in').click()
    //     cy.get('#username').type('user1')
    //     cy.get('#password').type('password1')
    //     cy.get('#login-button').click()
    // })

    describe('when logged in', function(){
        beforeEach(function(){
           cy.login({username : 'user1', password : 'password1'})
        })
        it('a new note can be created',function(){
            cy.contains('add new note').click()
            cy.get('#note-form').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
        describe('and a note exists', function() {
            beforeEach(function() {
                cy.createNote({
                    content : 'another note cypress',
                    important : false
                })
            })
            it('it can be made important', function() {
                cy.contains('another note cypress')
                  .contains('make important')
                  .click()

                cy.contains('another note cypress')
                  .contains('make not important')
            })
        })
        describe('and several notes exist', function () {
            beforeEach(function(){
                cy.createNote({content : 'first note', important : false })
                cy.createNote({content : 'second note', important : false })
                cy.createNote({content : 'third note', important : false})
            })
            it('one of those can be made important', function(){
                cy.contains('second note')
                  .contains('make important')
                  .click()

                cy.contains('second note')
                  .contains('make not important')
            })
            // it('other of those can be made important', function(){
            //     cy.contains('second note').parent().find('button').click()
            //     cy.contains('second note').parent().find('button').should('contain', 'make not important')
            // })
        })
    })
})