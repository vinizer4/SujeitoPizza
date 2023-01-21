import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROUTES USER --

// Create User
router.post("/users", new CreateUserController().handle);

// User Login
router.post("/session", new AuthUserController().handle);

// User Details
router.get("/me", isAuthenticated, new DetailUserController().handle);

// -- ROUTES CATEGORY --

// Create Category
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

// List Categories
router.get("/category", isAuthenticated, new ListCategoryController().handle);

// -- ROUTER PRODUCT --

// Create Product
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

// List Products where category

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

export { router };
