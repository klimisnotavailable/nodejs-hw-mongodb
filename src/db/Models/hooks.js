export const mongooseSaveError = (error,data,next) =>{
    error.status = 500;
    next();
};

export const setUpdateSettings = function(next){
    this.options.new = true;
    this.options.runValisators = true;
    next();
};
