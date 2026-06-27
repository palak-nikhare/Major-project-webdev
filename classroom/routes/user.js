const express = require("express");
const router = express.Router();


//Index-users
router.get("/" , (req, res)=> {
    res.send("GET for users");
})

//Show-users
router.get("/:id" , (req, res)=> {
    res.send("GET for SHOW users");
})

//Post-users
router.post("/" , (req, res)=> {
    res.send("POST for users");
})

//Delete-route
router.delete("/:id" , (req, res)=> {
    res.send("DELETE for users");
})

module.exports = router;