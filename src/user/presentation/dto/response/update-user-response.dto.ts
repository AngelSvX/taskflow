export class UpdateUserResponseDto {
    code: number;
    status: string;
    message: string;
    data: {
        id: string;
        name?: string;
        email?: string;    
    }
}