export const MAIN_PATH = () => '/';
export const AUTH_PATH = () => '/auth';
export const SIGN_UP = () => '/signUp';
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
export const BOARD_PATH = () => '/board';
export const BOARD_DETAIL_PATH = (boardNumber: string | number) => `/board/detail/${boardNumber}`;
export const BOARD_WRITE_PATH = () => `/board/write`;
export const BOARD_UPDATE_PATH = (boardNumber: string | number) => `/board/update/${boardNumber}`;

export const RECIPE_PATH = () => '/recipe';
export const RECIPE_DETAIL_PATH = (boardNumber: string | number) => `/recipe/detail/${boardNumber}`;
export const RECIPE_WRITE_PATH = () => `/recipe/write`;
export const RECIPE_UPDATE_PATH = (boardNumber: string | number) => `/recipe/update/${boardNumber}`;
