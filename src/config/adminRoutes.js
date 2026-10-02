import routes from "@/lib/routes";

export const adminNavigation = [
  {
    label: "Dashboard",
    href: routes.admin,
  },

  {
    label: "Products",
    href: routes.adminProducts,
  },

  {
    label: "Categories",
    href: routes.adminCategories,
  },

  {
    label: "Orders",
    href: routes.adminOrders,
  },

  {
    label: "Customers",
    href: routes.adminCustomers,
  },

  {
    label: "My Profile",
    href: "/admin/profile",
  },
];