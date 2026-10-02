const routes = {
  // =========================
  // CUSTOMER
  // =========================

  home: "/",

  about: "/about",
  categories: "/categories",

  products: "/products",
  productDetails: (id) => `/products/${id}`,

  services: "/services",
  contact: "/contact",

  profile: "/profile",

  address: "/address",
  addAddress: "/address/add",
  editAddress: (id) => `/address/edit?id=${id}`,

  cart: "/cart",
  checkout: "/checkout",

  deliverySlot: "/delivery-slot",
  orderSummary: "/order-summary",
  orderConfirmation: "/order-confirmation",

  // =========================
  // PAYMENT
  // =========================

  payment: "/payment",
  cardPayment: "/payment/card",
  codPayment: "/payment/cod",
  upiPayment: "/payment/upi",
  netBankingPayment:
    "/payment/netbanking",

  paymentSuccess: "/payment/success",
  paymentFailed: "/payment/failed",

  subscription: "/subscription",

  // =========================
  // AUTH
  // =========================

  login: "/login",
  register: "/register",

  forgotPassword: "/forgot-password",
  changePassword: "/change-password",

  otpVerification: "/otp-verification",

  onboarding: "/onboarding",
  splash: "/splash",
  welcome: "/welcome",

  // =========================
  // ADMIN
  // =========================

  admin: "/admin",

  adminProducts: "/admin/products",
  adminNewProduct:
    "/admin/products/new",
  adminProductDetails: (id) =>
    `/admin/products/${id}`,
  adminEditProduct: (id) =>
    `/admin/products/${id}/edit`,

  adminCategories:
    "/admin/categories",
  adminNewCategory:
    "/admin/categories/new",
  adminCategoryDetails: (id) =>
    `/admin/categories/${id}`,
  adminEditCategory: (id) =>
    `/admin/categories/${id}/edit`,

  adminOrders: "/admin/orders",
  adminOrderDetails: (id) =>
    `/admin/orders/${id}`,

  adminCustomers:
    "/admin/customers",
  adminCustomerDetails: (id) =>
    `/admin/customers/${id}`,
};

export default routes;