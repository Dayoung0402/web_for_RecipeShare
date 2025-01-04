
import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from "./ju/auth";
import { ResponseDto } from './response';
import SignInResponseDto from './ju/auth/sign-in.response.dto';
import { PostBoardRequestDto } from './request/board';
import { PostBoardResponseDto, GetBoardResponseDto, GetLatestBoardListReponseDto, GetTop3BoardListResponseDto } from './response/board';
import { GetSignInUserResponseDto } from './response/user';
import SignUpResponseDto from './ju/auth/sign-up.response.dto';


const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async(requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

export const signUpRequest = async(requestBody:SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(),requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;


};


export const tmp= '';

const multipartFormData = {headers: {'Content-Type': 'multipart/form-data'}};

const authorization = (accessToken : string ) => { 
    return { headers: { Authorization : `Bearer ${accessToken}`}}
};


// fileUpLoadeRequest와 PostBoardUrl 합치기 
const POST_BOARD_URL = () => `${API_DOMAIN}/board`; // 주소 다른 것 같은데 일단 해보기 
export const postBoardRequest = async (
    requestBody: PostBoardRequestDto,
    accessToken: string
  ) => {
    try {
      const response = await axios.post<PostBoardResponseDto>(POST_BOARD_URL(), requestBody, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      if (!error.response) return null;
      return error.response.data as ResponseDto;
    }
  };

const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;

export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.reponse.data;
            return responseBody;
        })
        return result;
}; 


export const getLatestBoardListRequest = async () => {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
    .then(response => {
        const responseBody: GetLatestBoardListReponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

export const getTop3BoardListRequest = async () => {
    const result = await axios.get(GET_TOP_3_BOARD_LIST_URL())
    .then(response => {
        const responseBody: GetTop3BoardListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))

        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });

        return result; 
};

