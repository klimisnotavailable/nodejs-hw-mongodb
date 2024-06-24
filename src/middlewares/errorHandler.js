const errorHandler = (error,req,res,next) =>{
    const {status} = error;

    res.status(status).json({
        status,
        message:'Something went wrong',
        data:error,
    });
};

export default errorHandler;
