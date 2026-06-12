const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingsch = new Schema({
    title: {
        type :String,
        required : true
    } ,
    description :String ,
    image: {
    filename: String,
    url: {
        type : String,
        default: "https://images.unsplash.com/photo-1460627390041-532a28402358?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVnb21ib3xlbnwwfHwwfHx8MA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" : v,
},
    }
         ,
    price : Number ,
    location : String,
    country :String,
})

const listing = mongoose.model("listing", listingsch);
module.exports = listing;