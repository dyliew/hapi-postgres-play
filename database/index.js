const massive = require('massive');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const AppUser = require('../Models/AppUser');

const connectionString = "postgres://web:aaAA1111@localhost:5432/hapi-postgresql-play";

const instance = massive.connectSync({ connectionString });
const seedInitialData = function(){
    if (!instance.user || !instance.user.findDocSync(1)){
        var defaultUser = new AppUser("test@ic.le");
        defaultUser.registrationDate = moment.utc();
        
        bcrypt.hash('password', 10, function(err, hash){
            defaultUser.passwordHash = hash;
            instance.saveDoc('app_user', defaultUser, function(err, res){
                console.log(`User ${res.id} - '${res.email}' is seeded`);
            });
        });
    }
};

module.exports = {
    seedInitialData,
    instance
};