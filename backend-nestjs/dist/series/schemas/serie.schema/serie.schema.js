"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerieSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SerieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: (val) => val.length > 2,
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
            validator: (val) => val.length > 0,
            message: "At least one category is required."
        }
    },
    numberOfEpisodes: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    synopsis: { type: String, required: true },
    punctuation: [
        {
            email: { type: String, required: true },
            punctuationNumber: { type: Number, required: true }
        }
    ]
}, { versionKey: false });
//# sourceMappingURL=serie.schema.js.map