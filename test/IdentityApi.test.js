import {container, TYPES} from '../src/inversify.config'
import MockEncryption, {encryptionKeyBinding, consistentHashBinding, encryptedStringBinding} from './MockEncryption';
container.bind(encryptedStringBinding).toConstantValue("myEncryptedString");
container.bind(consistentHashBinding).toConstantValue("myConsistentHash");
container.bind(encryptionKeyBinding).toConstantValue("myEncryptionKey");
container.bind(TYPES.Encryptor).to(MockEncryption).inSingletonScope();

import IdentityHandler from '../src/identity/IdentityHandler';
var identityHandler = new IdentityHandler("local")

test('register new user and login', () => {
  const username = "NewUser";
  const password = "NewPassword";
  identityHandler.RegistrationController.register(username, password);
  var encryptionKey = identityHandler.LoginController.login(username, password);
  console.log("Got encryption key: " + encryptionKey);
  });