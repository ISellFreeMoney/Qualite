const express = require("express");
const app = express();
const port = 3000;
const bp = require("body-parser");

const api = require("./routes/api");

app.use((req, res, next) => {
    // Permet d'autoriser l'accès à l'API lorsque le client est ouvert depuis un fichier (format file://)
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "*")
    next()
})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use("/api", api);

app.listen(3000, async () => {
    // Connecter le serveur au Arduino
    console.log(`Server is running on port ${port}`);
})
