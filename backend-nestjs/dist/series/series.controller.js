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
exports.SeriesController = void 0;
const common_1 = require("@nestjs/common");
const series_service_1 = require("./series.service");
const pagination_dto_1 = require("./dto/pagination.dto");
let SeriesController = class SeriesController {
    constructor(serieService) {
        this.serieService = serieService;
    }
    async create(serieDto) {
        try {
            const data = await this.serieService.create(serieDto);
            if (data) {
                return {
                    status: 'Created',
                    message: 'Serie created',
                    data
                };
            }
            else {
                throw new common_1.BadRequestException({
                    status: 'Error',
                    message: 'Error creating Serie.',
                });
            }
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async createMultiple(seriesDto) {
        try {
            const createdSeries = await this.serieService.createMultiple(seriesDto);
            if (createdSeries && createdSeries.length > 0) {
                return {
                    status: 'Created',
                    message: 'Series created',
                    data: createdSeries
                };
            }
            else {
                throw new common_1.BadRequestException({
                    status: 'Error',
                    message: 'Error creating the series.',
                });
            }
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async getSeries() {
        try {
            const data = await this.serieService.getSeries();
            return {
                status: 'ok',
                data
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async getSeriesPaginated(paginationDto) {
        try {
            var { page, limit } = paginationDto;
            page = page;
            limit = limit;
            const data = await this.serieService.getSeriesPaginated(page, limit);
            return {
                status: 'ok',
                ...data
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException({
                    status: 'Error',
                    message: e.message
                });
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async getSerie(id) {
        try {
            const data = await this.serieService.getSerie(id);
            if (!data) {
                throw new common_1.NotFoundException({
                    status: false,
                    message: 'Serie not found'
                });
            }
            return {
                status: true,
                data
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            if (e instanceof common_1.NotFoundException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async getCategories() {
        try {
            const data = await this.serieService.getCategories();
            return {
                status: 'Ok',
                data
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async getSeriesByCategory(id) {
        try {
            return await this.serieService.getSeriesByCategory(id);
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: false, message: e.message, });
            }
        }
    }
    async getSerieByName(name) {
        try {
            const data = await this.serieService.getSeriesByName(name);
            return {
                status: 'Ok',
                data
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async updatePutSerie(id, serieDto) {
        try {
            const data = await this.serieService.updateSerie(id, serieDto);
            if (!data) {
                throw new common_1.NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                });
            }
            return {
                status: 'Ok',
                message: 'Serie updated',
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            if (e instanceof common_1.NotFoundException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async updatePatchSerie(id, serieDto) {
        try {
            const data = await this.serieService.updateSerie(id, serieDto);
            if (!data) {
                throw new common_1.NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                });
            }
            return {
                status: 'Ok',
                message: 'Serie updated',
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            if (e instanceof common_1.NotFoundException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    async deleteSerie(id) {
        try {
            const data = await this.serieService.deleteSerie(id);
            if (!data) {
                throw new common_1.NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                });
            }
            return {
                status: 'Ok',
                message: 'Serie deleted',
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            if (e instanceof common_1.NotFoundException) {
                throw e;
            }
            throw new common_1.InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
};
exports.SeriesController = SeriesController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "createMultiple", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "getSeries", null);
__decorate([
    (0, common_1.Get)('paginated'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "getSeriesPaginated", null);
__decorate([
    (0, common_1.Get)('/serie/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "getSerie", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "getSeriesByCategory", null);
__decorate([
    (0, common_1.Get)('byName'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "getSerieByName", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "updatePutSerie", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "updatePatchSerie", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeriesController.prototype, "deleteSerie", null);
exports.SeriesController = SeriesController = __decorate([
    (0, common_1.Controller)('/api/v1/series'),
    __metadata("design:paramtypes", [series_service_1.SeriesService])
], SeriesController);
//# sourceMappingURL=series.controller.js.map