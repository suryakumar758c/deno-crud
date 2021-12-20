import { Router } from "../deps.ts";

import ProductController from "./controller/product.controller.ts";

const router = new Router({ prefix: "/api" });

router.post("/addProduct", ProductController.addProduct);
router.get("/getProducts", ProductController.getProducts);
router.put("/updateProduct", ProductController.updateProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);

export default router;
