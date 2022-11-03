import { NextFunction, Request, Response } from "express";
import ProductService from "@services/product.service";

class ProductController {
    public productSrv = new ProductService();

    public getStockLevelsBySku = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resp = await this.productSrv.getStockLevelsBySku(req.body.sku);
            res.status(200).json({ data: resp });
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;