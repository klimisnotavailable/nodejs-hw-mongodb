const notFoundHandler = (req,res) =>{
    res.status(404).send({
        message:"Route not found",
    });
};

export default notFoundHandler;
