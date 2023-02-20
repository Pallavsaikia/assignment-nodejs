const jwt=require('jsonwebtoken');
const {expiryTime}=require('../helper/expirytime')
function passwordRestDataModel(id){
    console.log(expiryTime())
    return {
        _id:id,
        expiry:expiryTime()
    }
}
function dataToJWT(data){
    return jwt.sign(data,process.env.JWT_SECRET_KEY)
}


module.exports={dataToJWT,passwordRestDataModel}