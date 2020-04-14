const bcrypt = require('bcryptjs');
function compare(password, hashedPassword) {

}

function bcryptComapre (req, res, next) {
    const password = req.body.password;
    const hashedPassword = req.expectedUser.password;
    bcrypt.compare(password, hashedPassword, function(err, response) {
        if(err){
            return res.json({ 
                status: 500,
                message: 'Internal server error!'
            });
        }
        else{
            console.log(response);
            if(response === false) {
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