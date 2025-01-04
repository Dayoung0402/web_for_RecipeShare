package com.jiraynor.board_back.common;

public interface ResponseMessage {

    // HTTP Status 200
    String SUCCESS = "Success.";
    String RATING_ADDED_SUCCESS = "Rating added successfully.";
    String AVERAGE_RATING_RETRIEVED_SUCCESS = "Average rating retrieved successfully.";

    // HTTP Status 400
    String VALIDATION_FAILED = "Validation failed.";
    String DUPLICATE_EMAIL = "Duplicate email.";
    String DUPLICATE_NICKNAME = "Duplicate nickname.";
    String NOT_EXISTED_USER = "This user does not exist.";
    String NOT_EXISTED_BOARD = "This board does not exist.";
    String INVALID_RATING = "Invalid rating. Rating must be between 1 and 5.";

    // HTTP Status 401
    String SIGN_IN_FAIL = "Login information mismatch.";
    String AUTHORIZATION_FAIL = "Authorization failed.";

    // HTTP Status 403
    String NO_PERMISSION = "Do not have permission.";

    // HTTP Status 500
    String DATABASE_ERROR = "Database error.";
    String RATING_RETRIEVAL_ERROR = "Failed to retrieve the rating.";
}
