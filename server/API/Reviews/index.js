// Libraries
import express from "express";
import passport from "passport";

// Database modal
import { ReviewModel } from "../../database/allModels";

//Validation
//import { ValidateNewReview } from "../../validation/reviews.js";
//import { ValidateRestaurantId } from "../../validation/food.js";

const Router = express.Router();

/*
Route     /
Des       Get all review
Params    resid
BODY      none
Access    Public
Method    GET  
*/
Router.get("/:resid", async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ restaurant: req.params.resid });
    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


/*
Route     /new
Des       Add new food review/rating
Params    none
BODY      review object
Access    Public
Method    POST  
*/
Router.post("/new", async (req, res) => {
  try {

    const { reviewData } = req.body;

    await ReviewModel.create(reviewData);

    return res.json({ review: "Sucessfully Created Review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /delete
Des       Delete new food review/rating
Params    _id
BODY      none
Access    Public
Method    DELETE  
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);

    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Sucessfully Deleted the Review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router; 