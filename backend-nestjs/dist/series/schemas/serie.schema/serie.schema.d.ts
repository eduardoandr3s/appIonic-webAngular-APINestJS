import { Schema } from "mongoose";
export declare const SerieSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    categories: {
        category: string;
        image: string;
    }[];
    images: string[];
    title: string;
    numberOfEpisodes: number;
    releaseDate: Date;
    synopsis: string;
    punctuation: {
        email: string;
        punctuationNumber: number;
    }[];
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    categories: {
        category: string;
        image: string;
    }[];
    images: string[];
    title: string;
    numberOfEpisodes: number;
    releaseDate: Date;
    synopsis: string;
    punctuation: {
        email: string;
        punctuationNumber: number;
    }[];
}>> & import("mongoose").FlatRecord<{
    categories: {
        category: string;
        image: string;
    }[];
    images: string[];
    title: string;
    numberOfEpisodes: number;
    releaseDate: Date;
    synopsis: string;
    punctuation: {
        email: string;
        punctuationNumber: number;
    }[];
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
