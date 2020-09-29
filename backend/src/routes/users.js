const express = require('express')

const router = express.Router()
const axios = require('axios')
const { celebrate, Joi, errors, Segments } = require('celebrate')

const describeImage = require('../lib/image-description')
const downloadImage = require('../lib/download-image')
const User = require('../models/user')
const Photo = require('../models/photo')

/* GET users listing. */
router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      age: Joi.number(),
    },
  }),
  async (req, res) => {
    const query = {}

    if (req.query.name) {
      query.name = req.query.name
    }

    if (req.query.age) {
      query.age = req.query.age
    }

    res.send(await User.find(query))
  }
)

/* POST create a user */
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
    },
  }),
  async (req, res) => {
    const userToCreate = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    }

    const createdUser = await User.create(userToCreate)
    res.send(createdUser)
  }
)

async function createPhoto(filename) {
  const photo = await Photo.create({ filename })

  const picsumUrl = `https://picsum.photos/seed/${photo._id}/300/300`
  const pictureRequest = await axios.get(picsumUrl)
  photo.filename = pictureRequest.request.path

  const imagePath = await downloadImage(picsumUrl, filename)
  const description = await describeImage(imagePath)
  photo.description = description.BestOutcome.Description

  return photo.save()
}

router.get('/initialize', async (req, res) => {
  const mihri = new User({ name: 'mihri', age: 35, email: 'mihri@coyotiv.com' })
  await mihri.setPassword('test')
  await mihri.save()

  const armagan = new User({ name: 'armagan', age: 36, email: 'armagan@coyotiv.com' })
  await armagan.setPassword('test')
  await armagan.save()

  const steve = new User({ name: 'steve', age: 21, email: 'steve@coyotiv.com' })
  await steve.setPassword('test')
  await steve.save()

  steve.bio = 'An awesome hacker who has seen it all, and now sharing them all with you.'
  steve.save()

  const berlinPhoto = await createPhoto('berlin.jpg')
  const munichPhoto = await createPhoto('munich.jpg')

  await steve.addPhoto(berlinPhoto)
  await steve.addPhoto(munichPhoto)

  await armagan.likePhoto(berlinPhoto)
  await mihri.likePhoto(berlinPhoto)

  console.log(steve)
  res.sendStatus(200)
})

router.post('/:userId/adds', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.addPhoto(photo)
  res.sendStatus(200)
})

router.post('/:userId/likes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.likePhoto(photo)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

module.exports = router
