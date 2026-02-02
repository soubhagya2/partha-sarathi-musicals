import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import wishlistRoutes from "./wishlistRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import addressRoutes from "./addressRoutes.js";
import couponRoutes from "./couponRoutes.js";
import bannerRoutes from "./bannerRoutes.js";
import offerRoutes from "./offerRoutes.js";
import shipmentRoutes from "./shipmentRoutes.js";
import supportTicketRoutes from "./supportTicketRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import newsletterRoutes from "./newsletterRoutes.js";
import taxRoutes from "./taxRoutes.js";
import rolePermissionRoutes from "./rolePermissionRoutes.js";

const router = Router();

// User routes
router.use("/users", userRoutes);

// Product and Category routes
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

// Shopping routes
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/shipments", shipmentRoutes);

// User account routes
router.use("/addresses", addressRoutes);
router.use("/reviews", reviewRoutes);
router.use("/notifications", notificationRoutes);
router.use("/support-tickets", supportTicketRoutes);

// Marketing routes
router.use("/coupons", couponRoutes);
router.use("/offers", offerRoutes);
router.use("/banners", bannerRoutes);
router.use("/newsletter", newsletterRoutes);

// Settings routes
router.use("/tax", taxRoutes);
router.use("/roles-permissions", rolePermissionRoutes);

export default router; // ✅ Must export default
