Parthasarathi Musical aims to be the ultimate destination for music enthusiasts, providing high-quality musical instruments and accessories for beginners, students, and professional musicians alike. Our platform combines the richness of traditional Indian music aesthetics with a modern, user-friendly e-commerce experience, making it easy to explore, compare, and purchase instruments with confidence. We strive to offer authentic products, secure payments, fast delivery, and dedicated customer support, helping musicians focus on their passion while we take care of the rest.

Node.js, Express, TypeScript, MongoDB, Mongoose, Redis, Clerk Authentication, Razorpay, Cloudinary(multer), Socket.io, Zod, Helmet, CORS, Express Rate Limit, Nodemailer (Brevo), WhatsApp Cloud API (via axios), Firebase Cloud Messaging, Swagger, Winston, Jest.

SUPER_ADMIN is the developer with full tech control, ADMIN is the business owner managing operations (no code access), and Customers/Support only use the system within limited permissions.

src/models/
├── index.ts                 # Exports all models
├── User.ts                  # SUPER_ADMIN, ADMIN, SUPPORT, CUSTOMER
├── Product.ts               # Instruments with images, stock, categories
├── Category.ts              # Strings, Percussion, Wind, etc.
├── Order.ts                 # Razorpay payments + order tracking
├── Cart.ts                  # Shopping cart with Redis sync
├── Review.ts                # Product ratings/reviews
├── Address.ts               # User delivery addresses
├── Coupon.ts                # Discount codes
├── Notification.ts          # Email/WhatsApp/FCM notifications
├── Payment.ts               # Razorpay payments & refunds
├── SupportTicket.ts         # Customer support tickets
└── Newsletter.ts            # Newsletter subscriptions
├── Banner.ts                # Homepage hero sliders / promotions
├── Wishlist.ts              # Customer wishlist items
├── Shipment.ts              # Shipment/courier tracking
├── RolePermission.ts        # Fine-grained permissions for roles
├── Offer.ts                 # Time-limited offers or discounts
├── Tax.ts                   # Tax slabs for products/orders
├── ActivityLog.ts           # User/admin actions for audit

User
├─< addresses: Address[] (1-to-many)
├─< cart: Cart (1-to-1)
├─< orders: Order[] (1-to-many)
├─< reviews: Review[] (1-to-many)
├─< supportTickets: SupportTicket[] (1-to-many)
├─< notifications: Notification[] (1-to-many)
├─< newsletter: Newsletter (1-to-1)
├─< wishlist: Wishlist[] (1-to-many)
└─< activityLogs: ActivityLog[] (1-to-many)

Product
├─ category: Category (many-to-1)
├─< reviews: Review[] (1-to-many)
├─< orders: Order.items[] (many-to-many via Order)
├─< cartItems: Cart.items[] (many-to-many via Cart)
├─< wishlistItems: Wishlist[] (many-to-many via Wishlist)
└─< offers: Offer[] (many-to-many via Offer)

Category
├─< products: Product[] (1-to-many)
└─< offers: Offer[] (many-to-many via Offer)

Order
├─ user: User (many-to-1)
├─ address: Address (many-to-1)
├─ items: Product[] (many-to-many)
├─ payment: Payment (1-to-1)
└─ shipment: Shipment (1-to-1)

Payment
├─ order: Order (1-to-1)
└─ user: User (many-to-1)

Cart
├─ user: User (1-to-1)
└─ items: Product[] (many-to-many)

Review
├─ user: User (many-to-1)
└─ product: Product (many-to-1)

SupportTicket
├─ user: User (many-to-1)
└─ assignedTo: User (SUPPORT/ADMIN) (many-to-1)

Notification
└─ user: User (many-to-1)

Newsletter
└─ user: User (many-to-1)

Banner
├─ linkedProduct?: Product (optional)
└─ linkedCategory?: Category (optional)

Wishlist
├─ user: User (many-to-1)
└─ product: Product (many-to-1)

Shipment
├─ order: Order (1-to-1)
└─ courierDetails: string

RolePermission
├─ role: UserRole
└─ permissions: string[]

Offer
├─ products: Product[] (many-to-many)
├─ categories: Category[] (many-to-many)
└─ validity: Date range

Tax
├─ products: Product[] (many-to-many)
└─ orders: Order[] (many-to-many)

ActivityLog
├─ user: User (many-to-1)
└─ action: string
└─ referenceModel?: string
└─ referenceId?: ObjectId

src/
├── controllers/
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── category.controller.ts
│   ├── product.controller.ts
│   ├── cart.controller.ts
│   ├── order.controller.ts
│   ├── payment.controller.ts
│   ├── coupon.controller.ts
│   ├── review.controller.ts
│   ├── wishlist.controller.ts
│   ├── address.controller.ts
│   ├── banner.controller.ts
│   ├── offer.controller.ts
│   ├── tax.controller.ts
│   ├── shipment.controller.ts
│   ├── notification.controller.ts
│   ├── supportTicket.controller.ts
│   ├── newsletter.controller.ts
│   └── admin/
│       ├── admin.user.controller.ts
│       ├── admin.order.controller.ts
│       ├── admin.product.controller.ts
│       └── admin.dashboard.controller.ts

src/
├── services/
│   ├── auth.service.ts
│   ├── product.service.ts
│   ├── order.service.ts
│   ├── payment.service.ts
│   ├── cart.service.ts
│   ├── notification.service.ts
│   └── admin/
│       └── admin.order.service.ts

src/
├── routes/
│   ├── index.ts                 # Main route loader
│   │
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── category.routes.ts
│   ├── product.routes.ts
│   ├── cart.routes.ts
│   ├── order.routes.ts
│   ├── payment.routes.ts
│   ├── coupon.routes.ts
│   ├── review.routes.ts
│   ├── wishlist.routes.ts
│   ├── address.routes.ts
│   ├── banner.routes.ts
│   ├── offer.routes.ts
│   ├── tax.routes.ts
│   ├── shipment.routes.ts
│   ├── newsletter.routes.ts
│   ├── notification.routes.ts
│   ├── supportTicket.routes.ts
│   │
│   └── admin/
│       ├── admin.routes.ts      # Admin route loader
│       ├── user.admin.routes.ts
│       ├── product.admin.routes.ts
│       ├── order.admin.routes.ts
│       ├── coupon.admin.routes.ts
│       └── dashboard.admin.routes.ts


src/
├── utils/
│   ├── logger.ts
│   ├── response.ts
│   ├── error.ts
│   ├── asyncHandler.ts
│   ├── generateOrderNumber.ts
│   ├── hash.ts
│   ├── date.ts
│   ├── pagination.ts
│   ├── validation.ts
│   └── constants.ts

src/
├── sockets/
│   ├── index.ts                 # Socket initialization
│   ├── socket.server.ts         # Attach socket to HTTP server
│   │
│   ├── events/
│   │   ├── connection.event.ts
│   │   ├── notification.event.ts
│   │   ├── chat.event.ts
│   │   └── order.event.ts
│   │
│   ├── handlers/
│   │   ├── notification.handler.ts
│   │   ├── chat.handler.ts
│   │   └── order.handler.ts
│   │
│   └── types/
│       └── socket.types.ts
