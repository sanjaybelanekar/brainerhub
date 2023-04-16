import { lazy } from "react";

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const Products = lazy(() => import("../../features/admin/products/Products"));
const AddEditProduct = lazy(
  () => import("../../features/admin/products/AddEditProduct")
);

export default [
  {
    label: "Products",
    component: <Products />,
    icon: <DashboardCustomizeIcon />,
    path: "/",
    showInMenu: false,
    showInSettings: false,
  },
  {
    label: "Products",
    component: <Products />,
    icon: <DashboardCustomizeIcon />,
    path: "/products",
    showInMenu: false,
    showInSettings: false,
  },
  {
    label: "AddEditProducts",
    component: <AddEditProduct />,
    icon: <DashboardCustomizeIcon />,
    path: "/products/:op/:id",
    showInMenu: false,
    showInSettings: false,
  },
];
