import LoginController from './LoginController';
import RegistrationController from './RegistrationController';

export default class IdentityHandler {
    constructor(storageType, encryptor){
        this.RegistrationController = new RegistrationController(storageType, encryptor);
        this.LoginController = new LoginController(storageType, encryptor);
    }
}