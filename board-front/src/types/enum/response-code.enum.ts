enum ResponseCode {
    // HTTP Status 200
    SUCESS = "SU",

    // HTTP Status 400
     VALIDATION_FAILED = "VF",
     DUPLICATE_EMAIL = "DE",
     DUPLICATE_NICKNAME = "DN", // 우리 전화번호는 필요 없어서 TEL_NUMBER는 뺐어요
     NOT_EXISTED_USER = "NU",
     NOT_EXISTED_BOARD = "NB",

    // HTTP Status 401
     SIGN_IN_FAIL = "SF",
     AUTHORIZATION_FAIL = "AF",

    // HTTP Status 403
     NO_PERMISSION = "NP",

    // HTTP Status 500
     DATABASE_ERROR = "DBE",
}

export default ResponseCode;