const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");


const mongo_url = "mongodb://127.0.0.1:27017/travelia";

main().then((res)=>{
    console.log("connected to db");
}).catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url)
};

const initdb = async () => {
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was initialised");
}

initdb().then((res)=> {
    console.log("data init");
}).catch((err)=> 
console.log(err));