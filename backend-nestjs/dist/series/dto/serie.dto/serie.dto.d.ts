export interface SerieDto {
    categories: CategoriesDto[];
    _id: string;
    title: string;
    numberOfEpisodes: number;
    releaseDate: Date;
    synopsis: string;
    images: string[];
}
export interface CategoriesDto {
    category: string;
    image: string;
}
