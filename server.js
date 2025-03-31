// ? Does node still use require?
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
server.use(express.json());

const { db, GameRecord } = require("./db/db.js");
console.log("GameRecord", GameRecord);

server.get("/", (req, res) => {
    console.log("incoming request to /");
    res.send({ hello: "world", message: "Hello, World!" });
});

server.post("/save-game", async (req, res) => {
    console.log("incoming request to /game-record");
    console.log("req.body", req.body.moves_history);
    const gameRecord = await GameRecord.create({
        player_name: req.body.player_name,
        moves_history: req.body.moves_history,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    res.send({ record: "created", gameRecord });
});

server.get("/game-records", async (req, res) => {
    console.log("incoming request to /game-records");
    const gameRecords = await GameRecord.findAll();
    res.send({ records: gameRecords });
});

server.get("/game-record/:id", async (req, res) => {
    console.log("incoming request to /game-record/:id");
    const gameRecord = await GameRecord.findByPk(req.params.id);
    res.send({ record: gameRecord });
});

// if heroku or AWS, process.env.PORT will be provided
// DMR 2/26 ? Does this also work for fly.io?
const port = process.env.PORT || 3001;

server.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port ${port}`);
});
