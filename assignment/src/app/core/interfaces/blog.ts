import { Category } from "./category";

export interface Blog {
    id: number,
    title: string,
    description: string,
    image: string,
    publish_date: string,
    categories: Category[],
    author: string
}

export interface AllBlogsRes {
    data: Blog[];
}