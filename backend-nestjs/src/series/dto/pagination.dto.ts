import {IsNumber, IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";

export class PaginationDto{
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    page?: number = 1; //Número de página actual

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    limit?: number = 10; //Cuantos elementos tiene cada página

}