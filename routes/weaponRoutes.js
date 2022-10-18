const Weapon = require('../models/Weapon')
const WeaponController = require('../controllers/weaponController')
const router = require('express').Router()

const upload = require('../util/uploadWeapon')

//create Weapon
router.post('/', upload, WeaponController.createWeapon)

//get all Weapon
router.get('/', WeaponController.getAllWeapon)

//get by name
router.get('/get_by_name/:name', WeaponController.getWeaponByName)

//get by type
router.get('/get_by_type/:type', WeaponController.getWeaponByType)

//delete weapon
router.delete('/:id', WeaponController.deleteWeapon)

module.exports = router