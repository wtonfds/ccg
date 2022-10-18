const mongoose = require('mongoose')

const Weapon = mongoose.model('Weapon', {
    name: String, 
    image: String, 
    coast: String, 
    type: String, 
    effect: String
})

module.exports = Weapon