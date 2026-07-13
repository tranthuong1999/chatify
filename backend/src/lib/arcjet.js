import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";
import dotenv from "dotenv";
dotenv.config();

const aj = arcjet({
    key: process.env.ARCJET_API_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        slidingWindow({
            mode: "LIVE",
            max: 100,
            interval: 60,
        })
    ],
});

export default aj;