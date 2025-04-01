import { Api } from './api';
import { API_URL, CDN_URL } from '../../utils/constants';
import { ProductList, ProductItem, PostOrderData, Order } from '../../types/index';

export class ServerApi extends Api {
    constructor() {
        super(API_URL);
    }

    _completeProductInfo(product: ProductItem): ProductItem {
        return {
            ...product,
            image: `${CDN_URL}/${product.image}`,
        };
    }

    async getProductList(): Promise<ProductList> {
        const productList = (await this.get('/product')) as ProductList;
        const products: ProductItem[] = productList.items.map(this._completeProductInfo);
        return {
            ...productList,
            items: products,
        };
    }

    async getProductItem(id: string): Promise<ProductItem> {
        const product = (await this.get(`/product/${id}`)) as ProductItem;
        return this._completeProductInfo(product);
    }

    postOrder(orderInfo: PostOrderData): Promise<Order> {
        return this.post('/order', orderInfo) as Promise<Order>;
    }
}