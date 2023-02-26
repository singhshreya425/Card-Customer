const cardModel = require('../model/cardModel')
const customerModel = require('../model/customerModel')
const uuid = require('uuid') // NPM PACKEGE IS USE FOR GENERATE RANDOM ID



//--------------------------------<CREATE CARD>-------------------------------------//

const createCard = async (req, res) => {
    try {
        let bodyData = req.body
        let { cardType, customerID } = bodyData

        const cardCount = await cardModel.find()

        //FETCH DATA AND COUNT LENGTH TO CREATE SERIAL costumerNO.

        bodyData.cardNumber = "C00" + (cardCount.length + 1)


        if (!cardType) return res.status(400).send({status: false,message: "Please mention the Card type." })
        
        if (cardType != "REGULAR" && cardType != "SPECIAL") { return res.status(400).send(
             {status: false,message: "cardType only followed enum ['REGULAR' , 'SPECIAL']"})  }

        if (!customerID) {return res.status(400).send({status: false,message: "Please provide customerID"})}
       
        const customerId = customerID.toString()
        
        let customerIDCheck = uuid.validate(customerId)
        
        if (customerIDCheck == false) { return res.status(400).send({ status: false, message: 'Invalid CustomerId.' }) }
        
        const custmData = await customerModel.findOne({ customerID: customerId })
       
        if (!custmData) {return res.status(404).send({ status: false,message: "No customer found with this customerID." }) }
        
        const custmCheck = custmData.status
       
        if (custmCheck == "INACTIVE") { return res.status(400).send({status: false,message: "customer with this Id is Deleted." }) }
       
        const cardCheck = await cardModel.findOne({ customerID: customerId })
       
        if (cardCheck) {return res.status(400).send({status: false, message: "A card is Already exist with this customerID." })}

        bodyData.customerName = custmData.firstName + " " + custmData.lastName

        const cardSave = await cardModel.create(bodyData)
        return res.status(201).send({ status: true, message: 'card created successfully', data: cardSave })

    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------------------<GET CARD>---------------------------------------//

const getCard = async (req, res) => {
    try {
        const cardData = await cardModel.find()
        return res.status(200).send({ status: true, message: "success", data: cardData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCard, getCard }