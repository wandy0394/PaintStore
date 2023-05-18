export type Product = {
    id:number
    name:string
    price:number
    description:string
    imageUrl:string
    productType:string
    brand:string
    quantityInStock:number
}

export type ProductParams = {
    orderBy:string,
    searchTerm?:string,
    productTypes?:string[],
    brands?:string[],
    pageNumber:number,
    pageSize:number
}