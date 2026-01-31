export class FindUserByIdResponseDto {
  code: number;
  status: string;
  message: string;
  method: string;
  data: {
    id: string;
    name: string;
    email: string;
    position: string;
    profiles: {
      bio: string;
      avatar_url: string;
    };
  };
}
