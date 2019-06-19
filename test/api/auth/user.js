const expect = require('chai').expect;
const request = require('supertest');
const testFactory = require('../../../test');
let app;

describe('*****USER AUTHENTICATION AND AUTHORIZATION*****', () => {
    before((done) => {
        testFactory.init().then((appObj) => { app = appObj; done() }).catch((err) => { done(err); process.exit(0); });
    })

    after((done) => {
        testFactory.disconnect().then(() => done()).catch((err) => done(err));
    })

    //Success Case.

    it('Happy Case(200), Create a User.', (done) => {
        request(app).post('/users/signup')
            .send({ email: 'foo@bar.com', password: "foobar123" })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(200);
                expect(body).to.contain.property('token');
                done();
            })
            .catch((err) => done(err));
    });

    it('Happy Case(200), Login to the user.', (done) => {
        request(app).post('/users/login')
            .send({ email: 'foo@bar.com', password: "foobar123" })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(200);
                expect(body).to.contain.property('token');
                done();
            })
            .catch((err) => done(err));
    });

    //Failure Case.

    it('Failure Case(422), Create user with out email.', (done) => {
        request(app).post('/users/signup')
            .send({})
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(422);
                expect(body.errors.param).to.equal('email');
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(422), Create user with out password.', (done) => {
        request(app).post('/users/signup')
            .send({ email: 'foo@bar.com' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(422);
                expect(body.errors.param).to.equal('password');
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(422), Create user with invalid email.', (done) => {
        request(app).post('/users/signup')
            .send({ email: 'foo', password: 'some password' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(422);
                expect(body.errors.param).to.equal('email');
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(422), Create user with invalid password.', (done) => {
        request(app).post('/users/signup')
            .send({ email: 'foo@bar.com', password: '121' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(422);
                expect(body.errors.param).to.equal('password');
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(422), Login with Empty username.', (done) => {
        request(app).post('/users/login')
            .send({ email: '', password: 'some password' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(422);
                expect(body.errors.param).to.equal('email');
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(422), Login with Empty password.', (done) => {
        request(app).post('/users/login')
            .send({ email: 'foo@bar.com', password: '' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(422);
                expect(body.errors.param).to.equal('password');
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(403), Invalid username and password.', (done) => {
        request(app).post('/users/login')
            .send({ email: 'foo@bar.com', password: 'some password' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(403);
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(200), Unavailable email reset-password.', (done) => {
        request(app).post('/users/reset-password')
            .send({ email: 'foo@bar.com1' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(200);
                done();
            })
            .catch((err) => done(err));
    });

    it('Failure Case(200), Reset password with email.', (done) => {
        request(app).post('/users/reset-password')
            .send({ email: 'foo@bar.com' })
            .then((res) => {
                const { body, status } = res;
                expect(status).to.equal(200);
                done();
            })
            .catch((err) => done(err));
    });
});
