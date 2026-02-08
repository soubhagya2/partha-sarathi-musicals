import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

// ===== DATABASE CONNECTION =====
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
};

// ===== SCHEMA DEFINITIONS =====
const rolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"],
      required: true,
      unique: true,
      index: true,
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
    isSystemRole: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"],
      default: "CUSTOMER",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);
const User = mongoose.model("User", userSchema);

// ===== SEED DATA =====
const ROLE_PERMISSIONS = [
  {
    role: "SUPER_ADMIN",
    permissions: [
      // User management
      "user:read",
      "user:write",
      "user:delete",
      // Product management
      "product:read",
      "product:write",
      "product:delete",
      // Order management
      "order:read",
      "order:update",
      "order:cancel",
      "order:refund",
      // Payment & finance
      "payment:read",
      "payment:refund",
      // Support
      "support:read",
      "support:reply",
      "support:close",
      // Marketing
      "coupon:manage",
      "banner:manage",
      "offer:manage",
      // System
      "activity:read",
      "role:manage",
      // Admin operations
      "admin:access",
      "analytics:view",
      "settings:manage",
      "reports:view",
    ],
    isSystemRole: true,
  },
  {
    role: "ADMIN",
    permissions: [
      // Product management
      "product:read",
      "product:write",
      "product:delete",
      // Order management
      "order:read",
      "order:update",
      "order:cancel",
      // Payment & finance
      "payment:read",
      // Support
      "support:read",
      "support:reply",
      // Marketing
      "coupon:manage",
      "banner:manage",
      "offer:manage",
      // Admin operations
      "admin:access",
      "analytics:view",
      "reports:view",
    ],
    isSystemRole: true,
  },
  {
    role: "SUPPORT",
    permissions: [
      // Support
      "support:read",
      "support:reply",
      "support:close",
      // Order management (view only)
      "order:read",
      // Activity
      "activity:read",
    ],
    isSystemRole: true,
  },
  {
    role: "CUSTOMER",
    permissions: [
      "product:read",
      "order:read",
      "support:read",
      "support:reply",
      "activity:read",
    ],
    isSystemRole: true,
  },
];

const SUPER_ADMIN_USER = {
  clerkId: process.env.SUPER_ADMIN_CLERK_ID,
  role: "SUPER_ADMIN",
  name: process.env.SUPER_ADMIN_NAME,
  email: process.env.SUPER_ADMIN_EMAIL,
  phone: process.env.SUPER_ADMIN_PHONE,
  isActive: true,
  isBlocked: false,
  lastLogin: new Date(),
};

// ===== SEED FUNCTION =====
const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...\n");

    // Step 1: Seed Role Permissions
    console.log("Seeding Role Permissions...");
    for (const rolePermission of ROLE_PERMISSIONS) {
      await RolePermission.updateOne(
        { role: rolePermission.role },
        { $set: rolePermission },
        { upsert: true },
      );
      console.log(`  ${rolePermission.role} permissions seeded`);
    }
    console.log("");

    // Step 2: Seed Super Admin User
    console.log("Seeding Super Admin User...");
    const existingSuperAdmin = await User.findOne({ role: "SUPER_ADMIN" });

    if (existingSuperAdmin) {
      console.log(
        `  Super Admin already exists with email: ${existingSuperAdmin.email}`,
      );
      console.log("  Skipping super admin creation\n");
    } else {
      const createdSuperAdmin = await User.create(SUPER_ADMIN_USER);
      console.log(`  Super Admin created successfully`);
      console.log(`     Email: ${createdSuperAdmin.email}`);
      console.log(`     Name: ${createdSuperAdmin.name}`);
      console.log(`     Phone: ${createdSuperAdmin.phone}`);
      console.log(`     ClerkId: ${createdSuperAdmin.clerkId}`);
      console.log(`     Created At: ${createdSuperAdmin.createdAt}\n`);
    }

    // Summary
    console.log("Database seeding completed successfully!\n");
    console.log("Summary:");
    const roleCount = await RolePermission.countDocuments();
    const userCount = await User.countDocuments();
    console.log(`  Total Roles: ${roleCount}`);
    console.log(`  Total Users: ${userCount}`);
    console.log(`  Super Admin Exists: ${existingSuperAdmin ? "Yes" : "No"}\n`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB Connection Closed");
  }
};

// ===== RUN SEED =====
connectDB().then(() => seedDatabase());
