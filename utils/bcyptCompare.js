const bcrypt = require('bcryptjs');

function bcryptComapre (req, res, next) {
    const password = req.body.password;
    const hashedPassword = req.expectedUser.password;
    bcrypt.compare(password, hashedPassword, function(err, res) {
        if(err){
            return res.json({ 
                status: 500,
                message: 'Internal server error!'
            });
        }
        else{
            if(!res) {
                return res.json({
                    status: 403,
                    message: 'Wrong credentials!'
                });
            }
            next();
        }
    });
}

module.exports = bcryptComapre;