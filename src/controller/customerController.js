const customerModel = require("../model/customerModel")

const uuid = require('uuid')// NPM PACKEGE IS USE FOR GENERATE RANDOM ID

const { isEmpty, isValidName, isValidEmail, isValidMobile, isVAlidDate } = require("../validation/validation")




//------------------------------<CREATE NEW CUSTOMER>-------------------------------------//

const createCustomer = async (req, res) => {
    try {
        let bodyData = req.body
        if (!bodyData) {
            return res.status(400).send({ status: false, message: "Request body can not be empty!!" })
        }
        let { firstName, lastName, mobileNumber, DOB, emailID, address } = bodyData

        if (!firstName) {
            return res.status(400).send({
                status: false,
                message: "Please provide Firstname in request body."
            })
        }
        if (!isValidName(firstName)) {
            return res.status(400).send({
                status: false,
                message: "The firstname is in Invalid format."
            })
        }
        if (!isEmpty(firstName)) {
            return res.status(400).send({
                status: false,
                message: "The firstname field can not be."
            })
        }

        if (!lastName) {
            return res.status(400).send({
                status: false,
                message: "Please provide lastName in request body."
            })
        }
        if (!isValidName(lastName)) {
            return res.status(400).send({
                status: false,
                message: "The lastName is in Invalid format."
            })
        }
        if (!isEmpty(lastName)) {
            return res.status(400).send({
                status: false,
                message: "The lastName field can not be."
            })
        }

        if (!mobileNumber) {
            return res.status(400).send({
                status: false,
                message: "Please provide mobileNumber in request body."
            })
        }
        if (!isEmpty(mobileNumber)) {
            return res.status(400).send({
                status: false,
                message: "The lastName field can not be."
            })
        }
        if (!isValidMobile(mobileNumber)) {
            return res.status(400).send({
                status: false,
                message: "The mobileNumber is in Invalid format."
            })
        }
        const mobilCheck = await customerModel.findOne({ mobileNumber: mobileNumber })
        if (mobilCheck) {
            return res.status(400).send({
                status: false,
                message: "The Mobile number is already registered"
            })
        }

        if (!DOB) {
            return res.status(400).send({
                status: false,
                message: "Please provide DOB in request body."
            })
        }
        if (!isVAlidDate(DOB)) {
            return res.status(400).send({
                status: false,
                message: "The DOB is in Invalid format., The format should be like 'YYYY-MM-DD"
            })
        }

        if (!emailID) {
            return res.status(400).send({
                status: false,
                message: "Please provide emailID in request body."
            })
        }
        if (!isValidEmail(emailID)) {
            return res.status(400).send({
                status: false,
                message: "The emailID is in Invalid format."
            })
        }
        if (!isEmpty(emailID)) {
            return res.status(400).send({
                status: false,
                message: "The emailID field can not be."
            })
        }
        const emailCheck = await customerModel.findOne({ emailID: emailID })
        if (emailCheck) {
            return res.status(400).send({
                status: false,
                message: "The email is already registered"
            })
        }

        if (!address) { return res.status(400).send({status: false,message: "Please provide address in request body." })}
        if (!isEmpty(address)) return res.status(400).send({status: false,message: "The address field can not be."})
       

        bodyData.customerID = uuid.v4()
        bodyData.status = "ACTIVE"

        const customerData = await customerModel.create(bodyData)
        return res.status(201).send({ status: true, message: "Customer successefully created.", data: customerData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//----------------------------------<FETCH CUSTOMER DATA>----------------------------------//

const getCustomer = async (req, res) => {
    try {
        const custmData = await customerModel.find({ status: "ACTIVE" })

       return res.status(200).send({ status: true, data: custmData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------------<DELETE CUSTOMER DATA>---------------------------------//

const deleteCustomer = async (req, res) => {
    try {
        const customerID = req.params.customerID.toString()
        let customerIDCheck = uuid.validate(customerID)
        if (customerIDCheck == false) {
            return res.status(400).send({
                status: false,
                message: 'Invalid CustomerId.'
            })
        }
        if (!customerID) {
            return res.status(400).send({ status: false, message: "Please provide customerId in params." })
        }
        const customerData = await customerModel.findOne({ customerID: customerID })

        if (!customerData) {
            return res.status(404).send({ status: false, message: "No customer found with This Id." })
        }
        if (customerData.status == "INACTIVE") {
            return res.status(400).send({ status: false, message: "The customer is Already Deleted." })
        }

        const deleteCustomer = await customerModel.findOneAndUpdate(
            { customerID: customerID },
            {
                $set: {
                    status: "INACTIVE"
                }
            },
            { new: true }
        )

        return res.status(200).send({ status: true, message: 'Customer Deleted successfully', data: deleteCustomer })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCustomer, deleteCustomer, getCustomer }