import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param, Patch,
    Post, Put, Query
} from '@nestjs/common';
import {CategoriesDto, SerieDto} from "./dto/serie.dto/serie.dto";
import {SeriesService} from "./series.service";
import {PaginationDto} from "./dto/pagination.dto";

@Controller('/api/v1/series')
export class SeriesController {

    constructor(private readonly serieService: SeriesService) {
    }

    @Post('') //Insertar una serie.
    async create(@Body() serieDto: SerieDto) {
        try {
            const data = await this.serieService.create(serieDto);
            if (data) {
                return {
                    status: 'Created',
                    message: 'Serie created',
                    data
                };
            } else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating Serie.',
                });
            }
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(
                {
                    status: 'Error',
                    message: e.message
                });
        }
    }



    @Post('')
    async createMultiple(@Body() seriesDto: SerieDto[]) {
        try {
            const createdSeries = await this.serieService.createMultiple(seriesDto);
            if (createdSeries && createdSeries.length > 0) {
                return {
                    status: 'Created',
                    message: 'Series created',
                    data: createdSeries
                };
            } else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating the series.',
                });
            }
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(
                {
                    status: 'Error',
                    message: e.message
                });
        }
    }

    @Get('')//Leer todas las series.
    async getSeries() {
        try {
            const data = await this.serieService.getSeries();

            return {
                status: 'ok',
                data
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(
                {
                    status: 'Error',
                    message: e.message
                });
        }
    }

    @Get('paginated')
    async getSeriesPaginated(@Query() paginationDto: PaginationDto) {
        try {
            var {page, limit} = paginationDto;
            page = page as number;
            limit = limit as number;
            const data =
                await this.serieService.getSeriesPaginated(page, limit);
            return {
                status: 'ok',
                ...data
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException({
                    status: 'Error',
                    message: e.message
                });
            }
            throw new InternalServerErrorException(
                {
                    status: 'Error',
                    message: e.message
                });
        }
    }

    @Get('/serie/:id') //Leer una serie dado un id.
    async getSerie(@Param('id') id: string) {
        try {
            const data = await this.serieService.getSerie(id);
            if (!data) {
                throw new NotFoundException({
                    status: false,
                    message: 'Serie not found'
                });
            }
            return {
                status: true,
                data
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;    //error 400 error del usuario
            }
            if (e instanceof NotFoundException) {
                throw e; //404 Not Found
            }
            throw new InternalServerErrorException({
                status: 'Error', //error 500, error del servidor
                message: e.message
            });
        }
    }

    @Get('categories') //Leer todas las categorías.
    async getCategories() {
        try {
            const data = await this.serieService.getCategories();

            return {
                status: 'Ok',
                data
            };

        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error', //error 500, error del servidor
                message: e.message
            });

        }
    }


    @Get('/categories/:id') //Leer las series de una categoría dada.
    async getSeriesByCategory(@Param('id') id: string) {
        try {
            return await this.serieService.getSeriesByCategory(id);
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            } else {
                throw new InternalServerErrorException({status: false, message: e.message,});
            }
        }
    }

    @Get('byName')   //http://localhost:3000/api/v1/series/byName?name=LOQUESEA    Leer una serie dada una parte del título o la sinopsis.
    async getSerieByName(@Query('name') name: string) {
        try {

            const data = await this.serieService.getSeriesByName(name);
            return {
                status: 'Ok',
                data
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;    //error 400 error del usuario
            }
            throw new InternalServerErrorException({
                status: 'Error', //error 500, error del servidor
                message: e.message
            });

        }

    }

    @Put('/:id')  //Actualizar una serie.
    async updatePutSerie(@Param('id') id: string, @Body() serieDto: SerieDto) {
        try {
            const data = await this.serieService.updateSerie(id, serieDto);
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                });
            }
            return {
                status: 'Ok',
                message: 'Serie updated',
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;    //error 400 error del usuario
            }
            if (e instanceof NotFoundException) {
                throw e; //404 Not Found
            }
            throw new InternalServerErrorException({
                status: 'Error', //error 500, error del servidor
                message: e.message
            });
        }
    }

    @Patch('/:id')
    async updatePatchSerie(@Param('id') id: string, @Body() serieDto: any) {
        try {
            const data = await this.serieService.updateSerie(id, serieDto);
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                });
            }
            return {
                status: 'Ok',
                message: 'Serie updated',
            };

        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;    //error 400 error del usuario
            }
            if (e instanceof NotFoundException) {
                throw e; //404 Not Found
            }
            throw new InternalServerErrorException({
                status: 'Error', //error 500, error del servidor
                message: e.message
            });

        }
    }

    @Delete('/:id')  //Borrar una serie.
    async deleteSerie(@Param('id') id: string) {
        try {
            const data = await this.serieService.deleteSerie(id);
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                });
            }
            return {
                status: 'Ok',
                message: 'Serie deleted',
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;    //error 400 error del usuario
            }
            if (e instanceof NotFoundException) {
                throw e; //404 Not Found
            }
            throw new InternalServerErrorException({
                status: 'Error', //error 500, error del servidor
                message: e.message
            });
        }
    }
}
