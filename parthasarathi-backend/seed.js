// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Load env
dotenv.config();

// ================= DATABASE CONNECT =================
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) throw new Error("❌ MONGODB_URI not set");

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
};

// ================= ROLE PERMISSION SCHEMA =================
const rolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"],
      required: true,
      unique: true,
    },
    permissions: [{ type: String, required: true }],
    isSystemRole: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

// ================= USER SCHEMA (MATCHES YOUR TS MODEL) =================
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, sparse: true },
    phone: String,
    avatar: String,
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "SUPPORT", "CUSTOMER"],
      default: "CUSTOMER",
      required: true,
    },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
    refreshTokenFamily: [String],
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastLogin: Date,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

// Hash password
userSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Ensure ONLY ONE SUPER_ADMIN
userSchema.index(
  { role: 1 },
  { unique: true, partialFilterExpression: { role: "SUPER_ADMIN" } },
);

const User = mongoose.model("User", userSchema);

// ================= ROLE PERMISSIONS DATA =================
const ROLE_PERMISSIONS = [
  {
    role: "SUPER_ADMIN",
    permissions: [
      "user:read",
      "user:write",
      "user:delete",
      "product:read",
      "product:write",
      "product:delete",
      "order:read",
      "order:update",
      "order:cancel",
      "order:refund",
      "payment:read",
      "payment:refund",
      "support:read",
      "support:reply",
      "support:close",
      "coupon:manage",
      "banner:manage",
      "offer:manage",
      "activity:read",
      "role:manage",
      "admin:access",
      "analytics:view",
      "settings:manage",
      "reports:view",
    ],
  },
  {
    role: "ADMIN",
    permissions: [
      "product:read",
      "product:write",
      "product:delete",
      "order:read",
      "order:update",
      "order:cancel",
      "payment:read",
      "support:read",
      "support:reply",
      "coupon:manage",
      "banner:manage",
      "offer:manage",
      "admin:access",
      "analytics:view",
      "reports:view",
    ],
  },
  {
    role: "SUPPORT",
    permissions: [
      "support:read",
      "support:reply",
      "support:close",
      "order:read",
      "activity:read",
    ],
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
  },
];

// ================= ADMIN USERS FROM ENV =================
const SUPER_ADMIN_USER = {
  name: process.env.SUPER_ADMIN_NAME || "Parthasarathi Musical",
  email: process.env.SUPER_ADMIN_EMAIL,
  password: process.env.SUPER_ADMIN_PASSWORD,
  role: "SUPER_ADMIN",
};

const ADMIN_USER = {
  name: process.env.ADMIN_NAME || "Admin User",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "ADMIN",
};

// ================= SEED FUNCTION =================
const seedDatabase = async () => {
  try {
    console.log("\n🚀 Starting Database Seeding...\n");

    // Seed Roles
    console.log("🔐 Seeding Roles...");
    for (const role of ROLE_PERMISSIONS) {
      await RolePermission.updateOne({ role: role.role }, role, {
        upsert: true,
      });
      console.log(`   ✔ ${role.role}`);
    }

    // SUPER ADMIN
    console.log("\n👑 Seeding Super Admin...");
    let superAdmin = await User.findOne({ role: "SUPER_ADMIN" });

    if (!superAdmin && SUPER_ADMIN_USER.email && SUPER_ADMIN_USER.password) {
      superAdmin = await User.create(SUPER_ADMIN_USER);
      console.log(`   ✔ Super Admin Created: ${superAdmin.email}`);
    } else {
      console.log("   ⚠ Super Admin already exists or env missing");
    }

    // ADMIN
    console.log("\n🛡 Seeding Admin...");
    let admin = await User.findOne({ role: "ADMIN" });

    if (!admin && ADMIN_USER.email && ADMIN_USER.password) {
      admin = await User.create(ADMIN_USER);
      console.log(`   ✔ Admin Created: ${admin.email}`);
    } else {
      console.log("   ⚠ Admin already exists or env missing");
    }

    // Summary
    console.log("\n✅ SEED SUMMARY");
    console.log("Roles:", await RolePermission.countDocuments());
    console.log("Users:", await User.countDocuments());
    console.log("Super Admin Exists:", superAdmin ? "YES" : "NO");
    console.log("Admin Exists:", admin ? "YES" : "NO");
  } catch (err) {
    console.error("❌ Seed Failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 MongoDB Disconnected\n");
  }
};

// ================= RUN =================
connectDB().then(seedDatabase);
