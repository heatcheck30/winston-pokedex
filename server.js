const express = require("express");
const app = express();
const port = 3016;
const pokemon = require("./models/pokemon.js")
const methodOverride = require("method-override")


app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method"))

// new
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs");
})
// show all
app.get("/pokemon", (req,res) => {
    res.render("index.ejs", {data: pokemon});
})

//delete
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon");
})

//edit
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        data: pokemon[req.params.id],
        index: req.params.id
    })
})

//update
app.put("/pokemon/:id", (req, res) => {
    id = parseInt(req.params.id) - 1;
    console.log(id);
    foundPoke = pokemon[id];
    console.log(foundPoke["name"]);
    console.log(req.body.type);
    foundPoke["name"] = req.body.name;
    foundPoke["img"] = req.body.img;
    foundPoke["type"] = req.body.type.split(",");

    foundPoke['stats']["hp"] = req.body.hp;
    foundPoke['stats']["attack"] = req.body.attack;
    foundPoke['stats']["defense"] = req.body.defense;
    foundPoke['stats']["speed"] = req.body.speed;

    res.redirect("/pokemon")
})

//create
app.post("/pokemon", (req, res) => {
    pokemon.push(req.body);
    console.log(req.body);
    res.redirect("/pokemon");
})

// show one
app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {
        data: pokemon[req.params.id]
    })
})

app.use(express.static('public'));

app.listen(port, ()=> {
    console.log("Listening on port", port);
})