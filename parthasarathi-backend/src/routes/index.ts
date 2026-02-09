import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";
import reviewRoutes from "./reviewRoutes";
import wishlistRoutes from "./wishlistRoutes";
import paymentRoutes from "./paymentRoutes";
import addressRoutes from "./addressRoutes";
import couponRoutes from "./couponRoutes";
import bannerRoutes from "./bannerRoutes";
import offerRoutes from "./offerRoutes";
import shipmentRoutes from "./shipmentRoutes";
import supportTicketRoutes from "./supportTicketRoutes";
import notificationRoutes from "./notificationRoutes";
import newsletterRoutes from "./newsletterRoutes";
import taxRoutes from "./taxRoutes";
import rolePermissionRoutes from "./rolePermissionRoutes";

const router = Router();

// Authentication routes (must come first, no auth required for register/login)
router.use("/auth", authRoutes);

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
