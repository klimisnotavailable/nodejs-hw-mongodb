const errorHandler = (error,req,res,next) =>{
    console.log(error);
    const {status,message} = error;

    res.status(status).json({
        status,
        message:'Something went wrong',
        data:message,
    });
};

export default errorHandler;
