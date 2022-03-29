import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
});

function getAnalytics(): firebase.analytics.Analytics | null {
  if (process.env.REACT_APP_FIREBASE_projectId) {
    return firebase.analytics();
  }
  return null;
}

export async function loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function loginUserWithJwt(JWT: string): Promise<firebase.auth.UserCredential> {
  return firebase.auth().signInWithCustomToken(JWT);
}

export function getUserId() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  const currentUserId = currentUser!.uid;
  trackUserId(currentUserId);
  return currentUserId;
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export function getEmailVerification() {
  return getCurrentUser()?.emailVerified;
}

export function getCurrentUserEmail() {
  return getCurrentUser()?.email ?? undefined;
}

export function trackUserId(userId: string) {
  if (userId) {
    getAnalytics()?.setUserId(userId);
  }
}

export function logEvent(eventName: string, properties: object) {
  getAnalytics()?.logEvent(eventName, properties);
}

export function setCurrentScreen(screenName: string) {
  getAnalytics()?.setCurrentScreen(screenName);
}

export function setUserProperties(userProperties: any) {
  getAnalytics()?.setUserProperties(userProperties);
}

export default firebase;
