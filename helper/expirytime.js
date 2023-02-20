function expiryTime() {

    return milliseconds = new Date().getTime()+900000//expiry in 15 minutes
}

module.exports = {expiryTime}