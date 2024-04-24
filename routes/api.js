const express = require("express")
const router = express.Router();

const {getLatestRow, getSince, addRow, getAll} = require("../db");

router.get("/getLatest", (req, res, next) => {
    const data = getLatestRow();

    res.json(data)
});

router.get("/getSince/:since", (req, res, next) => {
    const data = getSince(req.params.since);
    res.json(data)
});

router.get("/getAll", (req, res, next) => {
    const data = getAll()
    res.json(data)
})

router.post("/addRow", (req, res, next) => {
    const body = req.body;
    console.log(body)
    addRow(body)
    res.send({
        message:"Colonne bien ajoutée"
    })
})

module.exports = router;
