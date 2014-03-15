module.exports =  function(req, res, next) {
        req.session = null;
        next();
};