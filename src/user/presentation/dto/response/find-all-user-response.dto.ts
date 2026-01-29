export class FindAllUserResponseDto{
    code: number;
    status: string;
    message: string;
    data: {
        id: string,
        name: string,
        email: string
        position: string
        profiles: {
            bio: string;
            avatar_url: string;
        }
    }[];
}