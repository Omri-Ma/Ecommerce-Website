const router = require("express").Router();
const Sold = require("../models/soldModel");
const authMiddleware = require("../middlewares/authMiddleware");


// add sold items to sold db
router.post("/add-sold", authMiddleware, async (req, res) => {
  try {
    const newSold = new Sold(req.body);
    await newSold.save();
    res.send({
      success: true,
      message: "Added to sold successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get sold items from db
router.get("/get-sold-items", authMiddleware, async (req, res) => {
  try {
    const sold = await Sold.find();
   
    res.send({
      success: true,
      message: "Sold items fetched successfully",
      data: sold,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



module.exports = router;
