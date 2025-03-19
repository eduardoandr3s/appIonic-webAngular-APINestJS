import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Serie} from "./interface/serie/serie.interface";
import {CategoriesDto, SerieDto} from "./dto/serie.dto/serie.dto";

@Injectable()
export class SeriesService {

    constructor(
        @InjectModel('Serie')
        private serieModel: Model<Serie>) {
    }

    async create(serieDto: SerieDto): Promise<any> {
        const serie = new this.serieModel(serieDto);
        return serie.save();
    }

    async createMultiple(seriesDto: SerieDto[]): Promise<any[]> {
        try {
            const createdSeries = await Promise.all(
                seriesDto.map(async (serieDto) => {
                    const serie = new this.serieModel(serieDto);
                    return serie.save();
                })
            );
            return createdSeries;
        } catch (e: any) {
            throw new InternalServerErrorException(
                {
                    status: 'Error',
                    message: e.message
                });
        }
    }


    async getSeries(): Promise<Serie[]> {
        return this.serieModel.find();
    }

    async getSeriesPaginated(page: number, limit: number): Promise<any> {
        const skip = (page - 1) * limit;
        const data = await this.serieModel.find().skip(skip).limit(limit).exec();
        const total = await this.serieModel.countDocuments();

        return {
            data,
            info: {
                total,
                pageSize: limit,
                page
            }
        }
    }

    async getSerie(idSerie: string): Promise<any> {
        return this.serieModel.findById(idSerie);
    }

    getCategories(): Promise<string[]> {
        return this.serieModel.find().distinct('categories');
    }

    async getSeriesByName(name: string): Promise<Serie[]> {
        const regex = new RegExp(name, 'i');    // con la 'i' le digo que es ignoreCase
        return this.serieModel.find({
            $or: [
                { title: { $regex: regex } },
                { synopsis: { $regex: regex } }
            ]
            }

        );
    }

    async getSeriesByCategory(id: string): Promise<Serie[]> {
        return this.serieModel.find({categories: {$elemMatch: {_id: id}}
        });
    }

    async updateSerie(idSerie: string, serieDto: SerieDto): Promise<any> {
        return this.serieModel.findByIdAndUpdate(
            idSerie,
            {$set: serieDto},
            {new: true}
        );
    }

    async deleteSerie(idSerie: string): Promise<any> {
        return this.serieModel.findByIdAndDelete(idSerie);
    }



}
