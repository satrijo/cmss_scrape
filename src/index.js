import fetchData from "./lib/scrape.js";
import express from "express";
import cors from "cors";

const app = express();
const port = 3123;

app.use(cors());
app.get("/", (req, res) => {
    res.json({
        status: "success",
        code: 200,
        data: null,
        error: null,
        message: "Hello World!"
    });
});

app.get("/api/cmss", async (req, res) => {
    const headers = req.headers;
    const token = headers.authorization;
    const key = "AbjadIndonesia";

    const param = req.query;
    const CCCC = param.cccc || "";
    const stnid = param.stnid || "";
    const MSG_TYPE = param.type;
    const url = "http://172.19.1.1/cgi-bin/extract_cmss.pl"
    const sum = param.sum;

    if (token !== key) {
        res.json({
            status: "error",
            code: 401,
            data: null,
            error: "Unauthorized",
            message: null
        });
        return;
    }

    if (!MSG_TYPE || !sum) {
        res.json({
            status: "error",
            code: 400,
            data: null,
            error: "Missing parameter cccc or type or sum or stnid",
            message: null
        });
        return;
    }

    const result = await fetchData(url, CCCC, MSG_TYPE, sum, stnid);

    res.json(result);
});

app.listen(port, () => {
    console.log(`CMSS scrape server listening at http://localhost:${port}`);
})