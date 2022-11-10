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
    //really unique way to solve the formatting of req.body so that the updated pokemon will be viewable in the show
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
    //this is not working completely, the data is post but you have to format as well to be able to see the show page, you can do the above but this is how i solved it
    const newPokemon = {
        name: req.body.name,
        type: req.body.type.split(','),
        img: req.body.img,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    };
    pokemon.push(newPokemon);
    //pokemon.push(req.body);
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