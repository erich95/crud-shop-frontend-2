import { Subcategory } from "./subCategory";

export class Product {
    id!: number;
    name!: string;
    brandName!: string;
    description!: string;
    price!: number;
    subCategory!: Subcategory;
    imgUrl!: string;
}