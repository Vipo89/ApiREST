// Importamos mongoose
const mongoose = require("mongoose");
// Instanciamos la calse Schema de mongoose
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, 
    required: [true, "El título es obligatorio"],
 },
 description:{
    type:String,
    required:[true,"La descripción es obligatoria"]
 },
  category:{
    type:String,
    required:[true,"La categoría es obligatoria"]
 },
 director:{
    type:String,
    required:[true,"El director es obligatorio"]
 },
 rating:{
    type:String,
    required:[true,"La valoración es obligatoria"]
 },
 posterURL:{
    type:String,
    required:[true,"El posterURL es obligatorio"]
 },
 trailerURL:{
    type:String,
    required:[true,"El trailerURL es obligatorio"]
 },
 year:{
    type:String,
    required:[true,"El año es obligatorio"]
 },
 createdAt: {
    type:Date,
    default:Date.now
 }
});

const movieModel = mongoose.model("Movie", movieSchema, "movies");

module.exports = movieModel;
