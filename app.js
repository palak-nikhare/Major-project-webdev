const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");

const mongo_url = "mongodb://127.0.0.1:27017/travelia";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

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
        console.log("");
    })
})

//new route
app.get("/listings/new", (req, res ) =>{
    res.render("listings/new.ejs");
})

//create route
app.post("/listings" , async(req ,res)=> {
    const newlis = new listing(req.body.listing)
    //here listing is mongoose.model
    await newlis.save();
    res.redirect("/listings");
})

//show route
app.get("/listings/:id" ,async (req , res)=>{
    let {id} = req.params;
    const Listing =await listing.findById(id);
    res.render("listings/show.ejs", {Listing})
})

//edit route
app.get("/listings/:id/edit", async (req,res)=>{
    const {id}= req.params;
    const list = await listing.findById(id);
    res.render("listings/edit.ejs", {list});
})

//returning to home page
app.get("/listings" , (req, res)=> {
    res.redirect("/listings");
})

//Update route
app.put("/listings/:id" ,async (req, res)=> {
    const {id}= req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
} )

//delete route
app.delete("/listings/:id",async (req,res)=> {
    const {id}= req.params;
    let dellist= await listing.findByIdAndDelete(id);
    console.log(dellist);
    res.redirect("/listings");
})

app.listen(8080, ()=> {
    console.log("server listening to port 8080");
})