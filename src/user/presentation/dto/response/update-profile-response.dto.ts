export class UpdateProfileResponseDto{
    code: number;
    status: string;
    message: string;
    data: {
        id: string;
        bio: string;
        avatar_url: string;
    }
}