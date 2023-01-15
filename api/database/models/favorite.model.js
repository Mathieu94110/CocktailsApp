const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    dateModified: {
      type: String,
    },
    idDrink: {
      type: String,
    },

    strCategory: {
      type: String,
    },
    strDrink: {
      type: String,
    },
    strAlcoholic: {
      type: String,
    },
    strDrinkThumb: {
      type: String,
    },
    strInstructions: {
      type: String,
    },
    strGlass: {
      type: String,
    },
    strIBA: {
      type: String,
    },
    strTags: {
      type: String,
    },
    strIngredient1: {
      type: String,
    },
    strIngredient2: {
      type: String,
    },
    strIngredient3: {
      type: String,
    },
    strIngredient4: {
      type: String,
    },
    strIngredient5: {
      type: String,
    },
    strMeasure1: {
      type: String,
    },
    strMeasure2: {
      type: String,
    },
    strMeasure3: {
      type: String,
    },
    strMeasure4: {
      type: String,
    },
    strMeasure5: {
      type: String,
    },
    strMeasure6: {
      type: String,
    },
    strMeasure7: {
      type: String,
    },
    strMeasure8: {
      type: String,
    },
    strMeasure9: {
      type: String,
    },
    strMeasure10: {
      type: String,
    },
    strMeasure11: {
      type: String,
    },
    strMeasure12: {
      type: String,
    },
    strMeasure13: {
      type: String,
    },
    strMeasure14: {
      type: String,
    },
    strMeasure15: {
      type: String,
    },

    strIngredient1: {
      type: String,
    },
    strIngredient2: {
      type: String,
    },
    strIngredient3: {
      type: String,
    },
    strIngredient4: {
      type: String,
    },
    strIngredient5: {
      type: String,
    },

    strMeasure1: {
      type: String,
    },
    strMeasure2: {
      type: String,
    },
    strMeasure3: {
      type: String,
    },
    strMeasure4: {
      type: String,
    },
    strMeasure5: {
      type: String,
    },
    strMeasure6: {
      type: String,
    },
    strMeasure7: {
      type: String,
    },
    strMeasure8: {
      type: String,
    },
    strMeasure9: {
      type: String,
    },
    strMeasure10: {
      type: String,
    },
    strMeasure11: {
      type: String,
    },
    strMeasure12: {
      type: String,
    },
    strMeasure13: {
      type: String,
    },
    strMeasure14: {
      type: String,
    },
    strMeasure15: {
      type: String,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };
