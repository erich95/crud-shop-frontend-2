import { CartDetail } from "./cartDetail";
import { User } from "./user";

export class Cart {
    id!: number;
    user!: User;
    cartDetail!: CartDetail[];
}