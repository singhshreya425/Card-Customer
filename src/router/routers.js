const express = require('express')
const router = express.Router()
const customerController = require('../controller/customerController')
const cardController = require("../controller/cardController")


//-------------------API FOR CUSTOMER COLLECTION--------------------------//

router.post("/customer", customerController.createCustomer) //CREATE CUSTOMER

router.get("/customers", customerController.getCustomer)//GET CUSTOMER

router.delete("/customer/:customerID", customerController.deleteCustomer) //DELETE CUSTOMER


//--------------------------API FOR CARD COLLECTION--------------------------//

router.post("/card", cardController.createCard)//CREATE USER CARD

router.get('/cards', cardController.getCard)//GET CARD





module.exports = router