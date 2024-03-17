const express = require('express');
const app = express();

app.use(express.json());

app.get("/login", (req, res) => {
    res.json("Login raw ymchi");
});
app.get("/permission", (req, res) => {
    res.json("Permission");
});
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});