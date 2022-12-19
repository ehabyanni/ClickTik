import { IProduct } from "./IProduct";

export interface ICategory{
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}