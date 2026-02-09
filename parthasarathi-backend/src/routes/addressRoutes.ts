import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/authJWT.middleware";

const addressRoutes = Router();

// All address routes require authentication
addressRoutes.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  // Get user's addresses
  res.json({ message: "Get user addresses" });
});

addressRoutes.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  // Add new address
  res.status(201).json({ message: "Address created" });
});

addressRoutes.get(
  "/:addressId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Get specific address
    const { addressId } = req.params;
    res.json({ message: `Get address ${addressId}` });
  },
);

addressRoutes.put(
  "/:addressId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Update address
    const { addressId } = req.params;
    res.json({ message: `Address ${addressId} updated` });
  },
);

addressRoutes.delete(
  "/:addressId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Delete address
    const { addressId } = req.params;
    res.json({ message: `Address ${addressId} deleted` });
  },
);

addressRoutes.patch(
  "/:addressId/default",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    // Set as default address
    const { addressId } = req.params;
    res.json({ message: `Address ${addressId} set as default` });
  },
);

export default addressRoutes;
