const firebase = {};
export default firebase;

export const auth = jest.fn(() => ({
  currentUser: {},
  onAuthStateChange: jest.fn(),
  signInWithCustomToken: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

export const analytics = jest.fn();
export const loginUser = jest.fn();
export const getUserId = jest.fn();
export const getEmailVerification = jest.fn();
export const trackUserId = jest.fn();
export const logEvent = jest.fn();
export const setCurrentScreen = jest.fn();
export const setUserProperties = jest.fn();
