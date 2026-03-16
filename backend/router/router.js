import express from "express"
import users from "../model/auth.js"
import auth from "../controllers/auth.js"
const router = express.Router()

router.route("/").get((req,res)=>{
    res.send("Hello backend se")
})

router.route("/auth").post(auth);


export default router