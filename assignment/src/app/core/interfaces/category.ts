export interface Category {
    id: number,
    title: string,
    text_color: string,
    background_color: string
}

export interface CategoryRes {
    data: Category[]
}