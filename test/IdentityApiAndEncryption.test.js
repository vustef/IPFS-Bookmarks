import {container, TYPES} from '../src/inversify.config'
import Encryption from '../src/identity/Encryption';
container.bind(TYPES.Encryptor).to(Encryption).inSingletonScope();

import IdentityHandler from '../src/identity/IdentityHandler';
var identityHandler = new IdentityHandler("local")

test('register new user and login', () => {
  const username = "NewUser";
  const password = "NewPassword";
  identityHandler.RegistrationController.register(username, password);
  var encryptionKey = identityHandler.LoginController.login(username, password);
  expect(encryptionKey[0]).toBeDefined()
  });

test('register new user and login fails for another one', () => {
  const username1 = "NewUser1";
  const password1 = "NewPassword1";
  const username2 = "NewUser2";
  const password2 = "NewPassword2";
  identityHandler.RegistrationController.register(username1, password1);
  var encryptionKey = identityHandler.LoginController.login(username1, password1);
  expect(encryptionKey[0]).toBeDefined()
  try {
    encryptionKey = identityHandler.LoginController.login(username2, password2);
  }
  catch {
    return;
  }

  expect(false).toBe(true);
});

test('register new user and login fails for another one with the same password', () => {
  const username1 = "NewUser1";
  const password1 = "NewPassword";
  const username2 = "NewUser2";
  const password2 = "NewPassword";
  identityHandler.RegistrationController.register(username1, password1);
  var encryptionKey = identityHandler.LoginController.login(username1, password1);
  expect(encryptionKey[0]).toBeDefined()
  try {
    encryptionKey = identityHandler.LoginController.login(username2, password2);
  }
  catch (error) {
    expect(error.message).toBe("Invalid username or password.");
    return;
  }

  expect(false).toBe(true);
});

test('register multiple users and login', () => {
  for (var i = 0; i < 3; ++i) {
    var username = "NewUser" + i;
    var password = "NewPassword" + i;
    identityHandler.RegistrationController.register(username, password);
    var encryptionKey = identityHandler.LoginController.login(username, password);
    expect(encryptionKey[0]).toBeDefined()
  }
});

test('register multiple users and login with the same password', () => {
  const password = "NewPassword";
  for (var i = 0; i < 3; ++i) {
    var username = "NewUser" + i;
    identityHandler.RegistrationController.register(username, password);
    var encryptionKey = identityHandler.LoginController.login(username, password);
    expect(encryptionKey[0]).toBeDefined()
  }
});

test('register user that already exists', () => {
  const username = "NewUser";
  const password1 = "NewPassword1";
  const password2 = "NewPassword2";
  identityHandler.RegistrationController.register(username, password1);
  var encryptionKey = identityHandler.LoginController.login(username, password1);
  expect(encryptionKey[0]).toBeDefined()
  try {
    encryptionKey = identityHandler.RegistrationController.register(username, password2);
  }
  catch (error) {
    expect(error.message).toBe("User already exists.");
    return;
  }

  expect(false).toBe(true);
});