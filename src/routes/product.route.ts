import { Router } from "express";
import { Routes } from "@/interfaces/routes.interface";
import ProductController from "@/controllers/product.controller";

class ProductRoute implements Routes {
    public path = '/product';
    public router = Router();
    public productController = new ProductController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/stock`, this.productController.getStockLevelsBySku);
    }
}

export default ProductRoute;