const express = require("express");
const router = express.Router();


//Index-users
router.get("/" , (req, res)=> {
    res.send("GET for posts");
})

//Show-users
router.get("/:id" , (req, res)=> {
    res.send("GET for SHOW posts");
})

//Post-users
router.post("/" , (req, res)=> {
    res.send("POST for posts");
})

//Delete-route
router.delete("/:id" , (req, res)=> {
    res.send("DELETE for posts");
})

module.exports = router;