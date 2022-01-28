//live
const BASE_URL = 'http://ukitss.com/Templates/';

const WEB_URL = 'https://ukitss.com/';

const IMAGE_URL = 'http://localhost:3005/';
const USER_TYPE = 1
const APP_NAME = 'cnrndev'

const kInternetError = "You're offline \n Please check internet connection."
const kSorryError = "Sorry, something wrong."
const kRegistrationMsg = 'Your registration is successful. We have sent an email with a confirmation link to your email address. In order to complete the registration process, please click the confirmation link.'
const kLogout = 'Are you sure you want to logout?'

//languageCode
const EnglishCode = "English"
const HindiCode = "हिन्दी"

const kStatus = 'status'
const kMessage = 'message'
const kTrue = 200
const kErrorCode = 500
const kUserNotFound = 404
const kFalse = 'false'
const kPost = 'post'
const kGet = 'get'
const kDel = 'DELETE'
const kUserToken = 'user_token'
const kUserData = 'user_data'
const kUserInfo = 'user_info'


const JSON_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}
const MULTI_PART_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
}
const API_FAILED = {
    'status': 'false',
    'message': kSorryError
}
const INTERNET_FAILED = {
    'status': 'false',
    'message': kInternetError
}


export {
    BASE_URL,
    WEB_URL,
    IMAGE_URL,
    USER_TYPE,
    JSON_HEADER,
    MULTI_PART_HEADER,
    INTERNET_FAILED,
    API_FAILED,
    kStatus,
    kTrue,
    kFalse,
    kMessage,
    kInternetError,
    kSorryError,
    kPost,
    kGet,
    kDel,
    kUserData,
    kErrorCode,
    kUserNotFound,
    kUserToken,
    APP_NAME,
    kRegistrationMsg,
    kLogout,
    EnglishCode,
    HindiCode,
    kUserInfo
}