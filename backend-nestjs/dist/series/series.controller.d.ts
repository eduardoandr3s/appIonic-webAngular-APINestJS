import { SerieDto } from "./dto/serie.dto/serie.dto";
import { SeriesService } from "./series.service";
import { PaginationDto } from "./dto/pagination.dto";
export declare class SeriesController {
    private readonly serieService;
    constructor(serieService: SeriesService);
    create(serieDto: SerieDto): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    createMultiple(seriesDto: SerieDto[]): Promise<{
        status: string;
        message: string;
        data: any[];
    }>;
    getSeries(): Promise<{
        status: string;
        data: import("./interface/serie/serie.interface").Serie[];
    }>;
    getSeriesPaginated(paginationDto: PaginationDto): Promise<any>;
    getSerie(id: string): Promise<{
        status: boolean;
        data: any;
    }>;
    getCategories(): Promise<{
        status: string;
        data: string[];
    }>;
    getSeriesByCategory(id: string): Promise<import("./interface/serie/serie.interface").Serie[]>;
    getSerieByName(name: string): Promise<{
        status: string;
        data: import("./interface/serie/serie.interface").Serie[];
    }>;
    updatePutSerie(id: string, serieDto: SerieDto): Promise<{
        status: string;
        message: string;
    }>;
    updatePatchSerie(id: string, serieDto: any): Promise<{
        status: string;
        message: string;
    }>;
    deleteSerie(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
