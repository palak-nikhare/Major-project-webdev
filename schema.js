const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing :joi.object ({
        title : joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image : joi.object({
    url: joi.string().allow("", null),
    filename: joi.string().allow("", null)
})

    }).required()
})

module.exports.reviewschema = joi.object({
    review: joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required(),
    }).required()
})


//https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D