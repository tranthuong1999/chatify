
import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.writeHead(429, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Too Many Requests" }));
            } else if (decision.reason.isBot()) {
                res.writeHead(403, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "No bots allowed" }));
            } else {
                res.writeHead(403, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Forbidden" }));
            }
        } else if (decision.ip.isHosting()) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden" }));
        } else if (decision.results.some(isSpoofedBot)) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Hello World" }));
        }
        next();
    } catch (error) {
        console.error("Arcjet middleware error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        next();
    }

}