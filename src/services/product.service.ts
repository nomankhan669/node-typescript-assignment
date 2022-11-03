import { HttpException } from "@exceptions/HttpException";
import { Stocks } from "@interfaces/stock.interface";
import { Transactions } from "@interfaces/transaction.interface";
import { readJsonFile } from "@utils/utils";
import path from "path";

class ProductService {
    public getStockLevelsBySku(sku: string): Promise<{sku: string, qty: number}> {
        const stockJson = readJsonFile(path.resolve('./stock.json'));
        const transactionJson = readJsonFile(path.resolve('./transactions.json'));
        
        return new Promise((resolve, reject) => {
            let refunded = 0, ordered = 0;
            const findStocks: Stocks = stockJson.find((stock) => stock.sku === sku);
            const findTransactions: Transactions[] = transactionJson.filter((transaction) => transaction.sku === sku);
            const qtyInStock = findStocks ? findStocks.stock : 0;

            if (qtyInStock === 0 && findTransactions.length === 0) throw new HttpException(404, 'SKU not found!');

            findTransactions.forEach((transaction, i) => {
                if (transaction.type === 'order') {
                    ordered = ordered + transaction.qty;
                }
                else {
                    refunded = refunded + transaction.qty;
                }
            });

            const actualQty = qtyInStock + (ordered - refunded);

            resolve({
                sku: sku,
                qty: actualQty
            });
        });

    }
}

export default ProductService;