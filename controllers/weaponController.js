const Weapon = require('../models/Weapon')
require('dotenv').config

const port = process.env.PORT || 3000

class WeaponController{

    static createWeapon = async (req, res) => {
        const {name, coast, type, effect} = req.body

        const path = req.file.path.replace(/\\/g, "/")
        var image =  `http://localhost:${port}/${path}`

        const weapon = {
            name,
            image,
            coast,
            type,
            effect
        }

        try {
            
            await Weapon.create(weapon)
    
            res.status(201).json({mesage: `Weapon ${name} created with success`})
    
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static getAllWeapon = async (req, res) => {

        try {
            const allWeapon = await Weapon.find()
            res.status(200).json(allWeapon)
        } catch (error) {
            res.status(500).json({error: error})
        }
    
    }

    static getWeaponByName = async(req, res) => {
        const weaponName = req.params.name
        const searchRegex = new RegExp(weaponName)

        try {
            const weapon = await Weapon.find({name: searchRegex})
            if(weapon.length == 0){
                res.status(422).json({error: "weapon not found"})
                return
            }

            res.status(200).json(weapon)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static getWeaponByType = async(req, res) => {
        const weapontype = req.params.type
        const searchRegex = new RegExp(weapontype)

        try {
            const weapon = await Weapon.find({type: searchRegex})
            if(weapon.length == 0){
                res.status(422).json({error: 'weapon not found'})
                return
            }

            res.status(200).json(weapon)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static updateWeapon = async (req, res) => {
        const id = req.params.id
    
        const {name, image, coast, type, effect} = req.body

        const weapon = {
            name,
            image,
            coast, 
            type, 
            effect
        }
    
        try {
           const updateWeapon = await Weapon.updateOne({_id: id}, weapon)
           res.status(200).json(updateWeapon)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static deleteWeapon = async (req, res) => {
        const id = req.params.id
    
        const weapon = await Weapon.findOne({_id: id})
    
        if(!weapon){
            res.status(422).json({message: 'weapon not exist'})
            return
        }
    
        try {
            await Weapon.deleteOne({_id: id})
            res.status(200).json({message: 'weapon deleted with success'})
        } catch (error) {
            res.status(500).json({error: error})
            
        }
    }

}

module.exports = WeaponController