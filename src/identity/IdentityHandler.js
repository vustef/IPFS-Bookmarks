import LoginController from './LoginController';
import RegistrationController from './RegistrationController';

export default class IdentityHandler {
    constructor(storageType){
        this.RegistrationController = new RegistrationController(storageType);
        this.LoginController = new LoginController(storageType);
    }
}