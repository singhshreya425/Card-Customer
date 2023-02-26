const isEmpty = function (value){
    if (typeof value ==="string" && value.trim().length === 0) return false;
    if(typeof value === "undefined" || value === null || value === "") return false
    return true;
};

const isValidName = function (name){
    const nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    return nameRegex.test(name);
};

const isValidEmail = function(email) {
    const emailRegex =
    /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const isValidMobile = function(mobile) {
    const mobileRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return mobileRegex.test(mobile);
};

const isVAlidDate = function (releasedAt){
    const DateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    return DateRegex.test(releasedAt);
    
};

module.exports = {isEmpty,isValidName,isValidEmail,isValidMobile,isVAlidDate}