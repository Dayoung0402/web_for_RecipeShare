import ResponseDto from "apis/response/Response.dto";

export default interface SignUpResponseDto extends ResponseDto {
    token: string;
    expirationTime: number;
}