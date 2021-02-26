const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
//const API_URL = 'https://worldtravelerapi.herokuapp.com'

// Tests 

// Profile Endpoints:
describe('Profiles Endpoints', () => {

// Get all Profiles

  it('should get all the profiles', async (done)  => {
    const res = await request(app)
      .get('/api/profiles')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBe(3)
    done()
    afterAll(() => mongoose.connection.close())
  })

  // Get Profile with Unknown profile Id

it('should show Profile not found!', async () => {
    const res = await request(app)
      .get('/api/profiles/60112c69211cda3ed8e941ec')
    expect(res.statusCode).toEqual(404)

    expect(res.text).toBe('error : Profile not found')
    afterAll(() => mongoose.connection.close())
  })

  
  // Get Profile with Unknown user Id

  it('should show Profile not found!', async () => {
    const res = await request(app)
      .get('/api/profiles/user/600991edd110b23c183755aa')
    expect(res.statusCode).toEqual(404)

    expect(res.text).toBe('error : Profile not found')
    afterAll(() => mongoose.connection.close())
  })


 // Modify someone else's Profile without having any valid access token

 it('should show Unauthorized to delete this profile!', async () => {
    const res = await request(app)
      .delete('/api/profiles/60229898cd019345980dbfee')
    expect(res.statusCode).toEqual(401)

    expect(res.text).toBe("{\"msg\":\"No token, authorization denied\"}")
    afterAll(() => mongoose.connection.close())
  })

})

// Cities Endpoints:
describe('Cities Endpoints', () => {

// Get all Cities

it('should get all the cities', async (done)  => {
  const res = await request(app)
    .get('/api/cities')
  expect(res.statusCode).toEqual(200)
  expect(res.body.length).toBe(7)
  done()
  afterAll(() => mongoose.connection.close())
})

})

// Questions Endpoints:
describe('Questions Endpoints', () => {

  // Get all Questions
  
  it('should get all the Questions', async (done)  => {
    const res = await request(app)
      .get('/api/questions')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBe(2)
    done()
    afterAll(() => mongoose.connection.close())
  })

   // Modify someone else's Question without having any valid access token

 it('should show Unauthorized to delete this question !', async () => {
  const res = await request(app)
    .delete('/api/questions/60229d2cf586360fec56742a')
  expect(res.statusCode).toEqual(401)

  expect(res.text).toBe("{\"msg\":\"No token, authorization denied\"}")
  afterAll(() => mongoose.connection.close())
  })

  // Trying to like a Question that doesn't exist / without any access

  it('should show Unauthorized!', async () => {
    const res = await request(app)
      .patch('/api/questions/like/600991edd110b23c183755ba')
    expect(res.statusCode).toEqual(401)

    expect(res.text).toBe("{\"msg\":\"No token, authorization denied\"}")
    afterAll(() => mongoose.connection.close())
  })
  
  
  
  })

  // Recmmandations Endpoints:
describe('Recommandations Endpoints', () => {

  // Get all Recommandations
  
  it('should get all the Recommandations', async (done)  => {
    const res = await request(app)
      .get('/api/recommandations')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBe(4)
    done()
    afterAll(() => mongoose.connection.close())
  })

   // Modify someone else's recommandation without having any valid access token

 it('should show Unauthorized to delete this recommandation !', async () => {
  const res = await request(app)
    .delete('/api/recommandations/60229ae0cd019345980dbff0')
  expect(res.statusCode).toEqual(401)

  expect(res.text).toBe("{\"msg\":\"No token, authorization denied\"}")
  afterAll(() => mongoose.connection.close())
  })

  // Trying to like a recommandation that doesn't exist / without any access

  it('should show Unauthorized!', async () => {
    const res = await request(app)
      .patch('/api/recommandations/like/600991edd110b23c183755ba')
    expect(res.statusCode).toEqual(401)

    expect(res.text).toBe("{\"msg\":\"No token, authorization denied\"}")
    afterAll(() => mongoose.connection.close())
  })
  
  
  
  })