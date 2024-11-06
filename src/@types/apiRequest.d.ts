interface UserAuthorizationParams {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  state: string;
  [key: string]: string;
}

interface RequestAccessTokenBody {
  code: code;
  redirect_uri: string;
  grant_type: string;
}
