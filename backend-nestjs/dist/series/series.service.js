"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SeriesService = class SeriesService {
    constructor(serieModel) {
        this.serieModel = serieModel;
    }
    async create(serieDto) {
        const serie = new this.serieModel(serieDto);
        return serie.save();
    }
    async createMultiple(seriesDto) {
        try {
            const createdSeries = await Promise.all(seriesDto.map(async (serieDto) => {
                const serie = new this.serieModel(serieDto);
                return serie.save();
            }));
            return createdSeries;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async getSeries() {
        return this.serieModel.find();
    }
    async getSeriesPaginated(page, limit) {
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
        };
    }
    async getSerie(idSerie) {
        return this.serieModel.findById(idSerie);
    }
    getCategories() {
        return this.serieModel.find().distinct('categories');
    }
    async getSeriesByName(name) {
        const regex = new RegExp(name, 'i');
        return this.serieModel.find({
            $or: [
                { title: { $regex: regex } },
                { synopsis: { $regex: regex } }
            ]
        });
    }
    async getSeriesByCategory(id) {
        return this.serieModel.find({ categories: { $elemMatch: { _id: id } }
        });
    }
    async updateSerie(idSerie, serieDto) {
        return this.serieModel.findByIdAndUpdate(idSerie, { $set: serieDto }, { new: true });
    }
    async deleteSerie(idSerie) {
        return this.serieModel.findByIdAndDelete(idSerie);
    }
};
exports.SeriesService = SeriesService;
exports.SeriesService = SeriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Serie')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeriesService);
//# sourceMappingURL=series.service.js.map