const errorHandler = (error,req,res,next) =>{
    const {status,message} = error;

    res.status(status).json({
        status,
        message:'Something went wrong',
        data:message,
    });
};

export default errorHandler;
