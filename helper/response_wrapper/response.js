
class Response {
    constructor(status =200 , success =true ,message,data=null) {
      this.status=status;
      this.success=success;
      this.message=message;
      this.data=data
    }
    sendResponse(response){
        response.status(this.status);
        response.json({
            success:this.success,
            data:this.data,
            message:this.message
            
        });
    
    }
}

module.exports = Response