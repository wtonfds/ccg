const Person = require('../models/Person')
require('dotenv').config

const port = process.env.PORT || 3000

class PersonController{

    static createPerson = async (req, res) => {
        const { personName, effect, classe, intelligence, dexterity, speed, strength, type, life } = req.body

        const path = req.file.path.replace(/\\/g, "/")
        var image =  `http://localhost:${port}/${path}`
    
        if(!personName){
            res.status(422).json({error: "Campo nome obrigatório"})
            return
        }

        if(!image){
            console.log(image)
            res.status(422).json({error: "Campo imagem obrigatório"})
            return
        }
        
        const person = {
            personName,
            effect,
            image,
            classe,
            intelligence,
            dexterity,
            speed,
            strength,
            type,
            life
        }
    
        try {
            
            await Person.create(person)
    
            res.status(201).json({mesage: `Person ${personName} created with success`})
    
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static getAllPerson = async (req, res) => {

        try {
            const allPerson = await Person.find()
            res.status(200).json(allPerson)
        } catch (error) {
            res.status(500).json({error: error})
        }
    
    }

    static getById = async (req, res) => {
        const id = req.params.id
    
        try {
            const person = await Person.findOne({_id: id})
            if(!person){
                res.status(422).json({error: "Person not found"})
                return
            }
    
            res.status(200).json(person)
        } catch (error) {
            res.status(500).json({error: error})
        }
    
    }

    static getByName = async (req, res) => {
        const personName = req.params.name
        const searchRegex = new RegExp(personName)
    
        try {
            
            const person = await Person.find({personName: searchRegex})
            if(person.length == 0){
                res.status(422).json({error: "Person not found"})
                return
            }

            res.status(200).json(person)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static getByClass = async (req, res) => {
        const classPerson = req.params.class
        const searchRegex = new RegExp(classPerson)
    
        try {
            
            const person = await Person.find({classe: searchRegex})
            if(person.length == 0){
                res.status(422).json({error: "Person not found"})
                return
            }

            res.status(200).json(person)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static getByType = async (req, res) => {
        const typePerson = req.params.type
        const searchRegex = new RegExp(typePerson)
    
        try {
            
            const person = await Person.find({type: searchRegex})
            if(person.length == 0){
                res.status(422).json({error: "Person not found"})
                return
            }

            res.status(200).json(person)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static updatePerson = async (req, res) => {
        const id = req.params.id
    
        const { personName, effect, image, classe, intelligence, dexterity, speed, strength, type, life } = req.body

        const person = {
            personName,
            effect,
            image,
            classe,
            intelligence,
            dexterity,
            speed,
            strength,
            type,
            life
        }
    
        try {
           const updatedPerson = await Person.updateOne({_id: id}, person)
           res.status(200).json(updatedPerson)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static deletePerson = async (req, res) => {
        const id = req.params.id
    
        const person = await Person.findOne({_id: id})
    
        if(!person){
            res.status(422).json({message: 'Person not exist'})
            return
        }
    
        try {
            await Person.deleteOne({_id: id})
            res.status(200).json({message: 'Person deleted with success'})
        } catch (error) {
            res.status(500).json({error: error})
            
        }
    }

}

module.exports = PersonController