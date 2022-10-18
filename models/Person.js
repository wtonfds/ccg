const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
        personName: String,
        effect: String,
        image: String,
        classe: String,
        intelligence: Number,
        dexterity: Number,
        speed: Number,
        strength: Number,
        type: String,
        life: Number
})

module.exports = Person