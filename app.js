const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")
const path = require("path");

const mongo_url = "mongodb://127.0.0.1:27017/travelia";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));

main().then((res)=>{
    console.log("connected to db");
}).catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url)
};

app.get("/", (req,res)=>{
    res.send("Hi ! I am root path");
})

app.get("/testlist" , async (req, res)=> {
    let sample = new listing({
        title : "The majestic ville",
        description : "by the beach",
        
        price : 3000 ,
        location : "calangute , goa",
        country : "India"
    })
    await sample.save();console.log("sample was saved");
    res.send("Successful test");
}
)

// index route
app.get("/listings" ,async (req, res)=>{
    const alllistings =await listing.find({});
    res.render("listings/index.ejs", {alllistings})
    await listing.find({}).then((res)=> {
        console.log(res);
    })
})

//new route
app.get("/listings/new", (req, res ) =>{
    res.render("listings/new.ejs");
})

//create route
app.post("/listings" , (req ,res)=> {
    let listing = req.body;
    console.log(listing);
})

//show route
app.get("/listings/:id" ,async (req , res)=>{
    let {id} = req.params;
    const Listing =await listing.findById(id);
    res.render("listings/show.ejs", {Listing})
})


app.listen(8080, ()=> {
    console.log("server listening to port 8080");
})