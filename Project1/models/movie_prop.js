const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: String,
  image: { type: String, default: 'https://media4.giphy.com/media/dwB8GZLYfZPig/giphy.gif?cid=ecf05e470df99d1816c15f419369d90e8cd97415df8b4684&rid=giphy.gif'},
  movie: String,
  price: String,
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
