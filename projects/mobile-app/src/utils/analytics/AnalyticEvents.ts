const EVENTS = {
  // Signup Events
  SIGN_UP_ATTEMPT: "Sign_Up_attempt",
  SIGN_UP_INITIATED: "Sign_Up_Initiated",
  SIGN_UP_CREATE_USER: "Sign_Up_Create_User",
  SIGN_UP_SUCCESS: "Sign_Up_Success",
  SIGN_UP_FAILURE: "Sign_Up_failure",
  RESEND_EMAIL: "Resend_Email",

  // Login Events
  LOGIN_ATTEMPT: "Login_attempt",
  LOGIN_SUCCESS: "Login_Success",
  LOGIN_FAILURE: "Login_Failure",

  // Forgot Password Events
  FORGOT_PASSWORD_ATTEMPT: "Forgot_password_attempt",
  FORGOT_PASSWORD_SUCCESS: "Forgot_password_success",

  // Screen Events
  SCREEN_VIEW: "Screen_view",
  VIEW_ITEM_LIST: "view_item_list",
  SELECT_TABS: "select_tabs",
  SELECT_STORE: "select_store",
  ORDER_TRACK: "Order_track", // Not used
  ORDER_REVIEW: "Order_Review", // Not used
  HAMBURGER_CLICK: "HamNavigation_Click",
  CHANGE_LANGUAGE: "ChangingLanguage",

  // API Error
  API_ERROR: "ApiError",

  // Payment Events
  PAYMENT_ATTEMPT: "PaymentAttempt",
  PAYMENT_METHOD_ADDED: "Payment_Method_Added",
  PAYMENT_GATEWAY_STATUS: "PaymentGateway_Integration_Status", // Not used
  PURCHASE: "Purchase", // Not used

  // Merchant Events
  IS_MERCHANT_INDIVIDUAL: "Is_Merchant_Is_Individual",
  MERCHANT_CREATION_INITIATED: "Merchant_Creation_Initiated",
  MERCHANT_APPLICATION_STATUS: "Merchant_Application_Status",
  MERCHANT_TRANSACTION: "Merchant_Transaction", // Not used
  BUTTON_CLICK: "Button_click",

  // Other Events
  APP_STATE_CHANGED: "App_State_Changed",
  PURCHASE_CRYPTO: "Purchase_Crypto",
  SEND_CRYPTO: "Send_Crypto",
  RECEIVE_CRYPTO: "Receive_Crypto",
  WITHDRAW_CRYPTO: "Withdraw_Crypto",
  PHOTO_CAPTURE_INITIATED: "Photo_Capture_Initiated",
  PHOTO_SELECTED: "Photo_Selected",
  PHOTO_VERIFIED: "Photo_Verified",
  EMAIL_VERIFICATION_STARTED: "Email_Verification_Started",
};

export default EVENTS;
