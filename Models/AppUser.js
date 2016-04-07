module.exports = function AppUser(email){
    this.email = email;
    this.passwordHash = null;
    this.registrationDate = null;
    this.firstName = '';
    this.lastName = '';
};