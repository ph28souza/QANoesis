const chai = require('chai');
const request = require('supertest');
const enviroment = require('./environments_parameters.json');
const expect = chai.expect;

describe('Desafio Noesis - API tests ', () => {
  it('Validação de titulo, ano e Linguagem estão corretos - GET', (done) => {
    request(enviroment.endpointBase)
      .get(`/?i=${enviroment.idFilme}&apikey=${enviroment.apiKey}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.Title).to.be.equal('The Social Network');
        expect(res.body.Year).to.be.equal('2010');
        expect(res.body.Language).to.be.equal('English, French');
        done();
      });
  });

  it('Validação de Busca filme inexistente - GET', (done) => {
    request(enviroment.endpointBase)
      .get(`/?i=${enviroment.idFilme}xpto&apikey=${enviroment.apiKey}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.Response).to.be.equal('False');
        expect(res.body.Error).to.be.equal('Incorrect IMDb ID.');
        done();
      });
  });

  it('Validação de ApiKey invalida - GET', (done) => {
    request(enviroment.endpointBase)
      .get(`/?i=${enviroment.idFilme}&apikey=${enviroment.apiKey}xpto`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.Response).to.be.equal('False');
        expect(res.body.Error).to.be.equal('Invalid API key!');
        done();
      });
  });
});
