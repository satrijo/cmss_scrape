import fetchData from "./lib/scrape.js";

const CCCC = "WIIL";
const MSG_TYPE = "AAXX";
const url = "http://172.19.1.1/cgi-bin/extract_cmss.pl"

const result = fetchData(url, CCCC, MSG_TYPE, 2);
result
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })