import { Product } from "./product";

export class CartDetail {
    id!: number;
    products!: Product;
    productQuantity!: number;
    totalPrice!: number;
}