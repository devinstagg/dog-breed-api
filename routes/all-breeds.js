const express = require('express');
const router = express.Router();
const dataAccessLayer = require("../DataAccess/DataAccessLayer.js")


const isValidDogBreed = (dogBreed) => {
  const hasValidBreed = !!dogBreed.breed
  return hasValidBreed
}

router.get('/', async (req,res) => {
  const allDogBreeds = await dataAccessLayer.getAllBreeds()
  res.send(allDogBreeds)
})

router.post('/', async (req,res) => {
  const dogBreed = req.body
  if (isValidDogBreed(dogBreed)) {
    await dataAccessLayer.createDogBreed(dogBreed)
    res.status(201).send(dogBreed)
  } else {
    res.status(400).send({
      dogBreed,
      message: 'Must include dog breed name'
    })
  }
})

router.put('/', async (req,res) => {
  const dogBreed = req.body

  if (isValidDogBreed(dogBreed)) {
    await dataAccessLayer.editDogBreed(dogBreed)
    res.send(dogBreed)
  } else {
    res.status(400).send({
      dogBreed,
      message: 'Must include dog breed name'
    })
  }
})

router.delete('/:id', async (req,res) => {
  const dogBreedId = req.params.id

  await dataAccessLayer.deleteDogBreed(dogBreedId)

  res.send(dogBreedId)
})


module.exports = router;
