import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SeriesModule} from './series/series.module';
import {ConfigModule} from "@nestjs/config";
import 'dotenv/config';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            process.env.DBURL as string
        ),
        SeriesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
