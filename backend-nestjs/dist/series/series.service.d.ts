import { Model } from "mongoose";
import { Serie } from "./interface/serie/serie.interface";
import { SerieDto } from "./dto/serie.dto/serie.dto";
export declare class SeriesService {
    private serieModel;
    constructor(serieModel: Model<Serie>);
    create(serieDto: SerieDto): Promise<any>;
    createMultiple(seriesDto: SerieDto[]): Promise<any[]>;
    getSeries(): Promise<Serie[]>;
    getSeriesPaginated(page: number, limit: number): Promise<any>;
    getSerie(idSerie: string): Promise<any>;
    getCategories(): Promise<string[]>;
    getSeriesByName(name: string): Promise<Serie[]>;
    getSeriesByCategory(id: string): Promise<Serie[]>;
    updateSerie(idSerie: string, serieDto: SerieDto): Promise<any>;
    deleteSerie(idSerie: string): Promise<any>;
}
