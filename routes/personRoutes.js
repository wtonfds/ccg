const Person = require('../models/Person')
const PersonController = require('../controllers/personController')
const router = require('express').Router()

const upload = require('../util/uploadPerson.js')


// create person
router.post('/', upload, PersonController.createPerson)

// get person
router.get('/', PersonController.getAllPerson)

// get by id
router.get('/:id', PersonController.getById)

// get by name
router.get('/get_by_name/:name', PersonController.getByName)

// get by class
router.get('/get_by_class/:class', PersonController.getByClass)

//get by type
router.get('/get_by_type/:type', PersonController.getByType)

// update
router.patch('/:id', PersonController.updatePerson)

// delete
router.delete('/:id', PersonController.deletePerson)


module.exports = router