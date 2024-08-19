import UserModel from "../models/userModel.js"; // Adjust the path as needed

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user.cart.find(
      (item) => item.id.toString() === productId
    );

    if (existingItem) {
      // Update quantity if the product already exists in the cart
      existingItem.quantity += 1;
    } else {
      // Add new product to the cart
      user.cart.push({ id: productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product in the cart
    const existingItem = user.cart.find(
      (item) => item.id.toString() === productId
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        // Decrease the quantity by 1 if more than 1
        existingItem.quantity -= 1;
      } else {
        // Remove the product from the cart if the quantity is 1
        user.cart = user.cart.filter(
          (item) => item.id.toString() !== productId
        );
      }

      await user.save();
      res
        .status(200)
        .json({ message: "Product updated in cart", cart: user.cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product in cart", error });
  }
};

export const handleClearCart = async () => {
  try {
    const response = await fetch('/api/clearCart', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Cart cleared:", data.cart);
      // Optionally, refresh or update the UI
    } else {
      console.log("Error clearing cart");
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};


export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the wishlist
    const isProductInWishlist = user.wishlist.some(
      (item) => item.id.toString() === productId
    );

    if (!isProductInWishlist) {
      user.wishlist.push({ id: productId });
      await user.save();
      res.status(200).json({
        message: "Product added to wishlist",
        wishlist: user.wishlist,
      });
    } else {
      res.status(400).json({ message: "Product is already in the wishlist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product to wishlist", error });
  }
};


export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the product ID from the wishlist
    user.wishlist = user.wishlist.filter(
      (item) => item.id.toString() !== productId
    );

    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product from wishlist", error });
  }
};


export const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};
