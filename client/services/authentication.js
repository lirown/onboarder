import { app } from './firebase';

/**
 * key to save uid of logged in user
 */
const LOGGED_IN_KEY = 'logged-in-uid';

/**
 * fetch user details will work after login otherwise return null
 * @return {Promise<String>}
 */

export function getUser() {
  const user = app.auth().currentUser;
  const uid = localStorage.getItem(LOGGED_IN_KEY);
  return user || (uid ? { uid } : null);
}

/**
 * fire a login Promise that return the user details
 * @return {Promise<String>}
 */

export function signIn(email, password) {
  return app
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      localStorage.setItem(LOGGED_IN_KEY, user.uid);
      return user;
    });
}

/**
 * fire a logout Promise that remove user session from browser
 * @return {Promise<String>}
 */

export async function signOut() {
  localStorage.removeItem(LOGGED_IN_KEY);
  return app.auth().signOut();
}

/**
 * fire a logout Promise that remove user session from browser
 * @return {Promise<String>}
 */

export function forgotPassword(email) {
  return app
    .auth()
    .sendSignInLinkToEmail(email, {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https:/onborading.forter.dev/forgot/',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'https:/onborading.forter.dev/forgot'
    })
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      return email;
    });
}

/**
 * fire a logout Promise that remove user session from browser
 * @return {Promise<String>}
 */

export function signUp(email, password, displayName) {
  return app
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in

      const res = await userCredential.user.updateProfile({
        displayName
      });

      const user = userCredential.user;
      return user;
    });
}
