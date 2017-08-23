const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    model: { type: String, required: true },
    wheelSize: { type: Number, required: true }
    // discBrakes: { type: Boolean, required: true }
})

const bikes = mongoose.model('bikes', bikeSchema);

module.exports = bikes;

// const bikeSchema = new mongoose.Schema({
//     model: { type: String },
//     suspension: Boolean,
//     components: [{
//         gears: { speed: Number },
//         brakes: { disc: Boolean },
//         wheels: { wheelSize: Number }
//     }],
//     seller: {type: String}
// })
