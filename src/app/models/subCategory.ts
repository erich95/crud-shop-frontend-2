import { Category } from "./category";
import { Product } from "./product";

export class Subcategory {  

    id!: number;
    name!: string;
    products!: Product[];
    category!: Category;
}