import {Schema} from "mongoose";

export const SerieSchema = new Schema({
    title: {type: String, required: true},
    images: {
        type: [String],
        required: true,
        validate: {
            validator: (val: any[]) => val.length > 2,
            message: "At least one image is required."
        }
    },
    categories: {
        type: [
            {
                category: { type: String, required: true },
                image: { type: String, required: true }
            }
        ],
        required: true,
        validate: {
            validator: (val: any[]) => val.length > 0,
            message: "At least one category is required."
        }
    },
    numberOfEpisodes: {type: Number, required: true},
    releaseDate: {type: Date, required: true},
    synopsis: {type: String, required: true},
    punctuation: [
        {
            email: {type: String, required: true},
            punctuationNumber: {type: Number, required: true}
        }

    ]
}, {versionKey: false});

