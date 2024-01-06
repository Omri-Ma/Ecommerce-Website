const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//new user registration
router.post("/register", async (req, res) => {
  try {
    //check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    // if user is active or not
    if (user.status !== "active") {
      throw new Error("User account is blocked!");
    }

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {});

    //send response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get current user

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all users
router.get("/get-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update user status
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);

    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// add to cart
router.put("/add-to-cart/:id", authMiddleware, async (req, res) => {
  try {
    const productId = req.body.item[0];
    const quantity = req.body.item[1];

    // Update the cart field in the User document, incrementing the quantity
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { [`cart.${productId}`]: quantity },
    });

    res.send({
      success: true,
      message: "Added to cart successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete item from cart
router.put("/delete-item-from-cart/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const productIdToRemove = req.body.item;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $unset: { [`cart.${productIdToRemove}`]: 1 },
    });

    res.send({
      success: true,
      message: "Product deleted successfully from cart",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update cart item
router.put("/update-cart/:id", authMiddleware, async (req, res) => {
  try {
    const productId = req.body.item.id;
    const quantity = req.body.item.amount;

    // Update the cart field in the User document, incrementing the quantity
    await User.findByIdAndUpdate(req.params.id, {
      $set: { [`cart.${productId}`]: quantity },
    });

    res.send({
      success: true,
      message: "Reset item in cart successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete the cart
router.delete("/delete-cart/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { $set: { cart: {} } });
    res.send({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// add to purchase history
router.put("/update-history/:id", authMiddleware, async (req, res) => {
  try {
    const historyItem = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      $push: {
        purchaseHistory: {
          $each: [historyItem],
          $position: 0,
        },
      },
    });
    res.send({
      success: true,
      message: "Purchase history updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
