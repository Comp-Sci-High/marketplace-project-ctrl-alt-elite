const express = require("express");


const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

let userInfo = {
   

}




app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});


app.get("/", async (req, res) => {
    const data = userInfo;
    res.render("index.html", data);
});







app.listen(3000, () => {
    console.log(`Server running.`);
});
