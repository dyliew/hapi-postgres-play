module.exports = function User(email){
    this.email = null;
    this.passwordHash = null;
    this.passwordSalt = null;
    this.registerDate = null;
    this.firstName = '';
    this.lastName = '';
};