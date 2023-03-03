import { User } from 'src/app/models/user';

export interface ResponseHttpLogin {
  status: boolean;
  errors: Object;
  data: {
    api_token: string;
    user: User;
    token_type: string;
    expires_at: string;
  };
}
