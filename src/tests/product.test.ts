import request from 'supertest';
import App from '../app';
import ProductRoute from '../routes/product.route';

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Product', () => {
    describe('[GET] /product/stock', () => {
        it('should response statusCode 200', () => {
            const sku = "DDB197432/70/91";
            const productRoute = new ProductRoute();
            const app = new App([productRoute]);

            return request(app.getServer()).get(`${productRoute.path}/stock`).send({ sku: sku }).expect(200, { data: { sku: "DDB197432/70/91", qty: 2852 }});
        });

        it('should response statusCode 404', () => {
            const sku = "12345";
            const productRoute = new ProductRoute();
            const app = new App([productRoute]);

            return request(app.getServer()).get(`${productRoute.path}/stock`).send({ sku: sku }).expect(404);
        });
    });
});