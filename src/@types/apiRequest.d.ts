import ApiConstants from '@network/apiConstants';

const { code: grantTypeCode, token: grantTypeToken } = ApiConstants.accountData.grantType;

declare global {
  interface UserAuthorizationParams {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
    [key: string]: string;
  }

  interface RequestAccessTokenBodyViaCode {
    grant_type: typeof grantTypeCode;
    code: string;
    redirect_uri: string;
  }

  interface RequestAccessTokenBodyViaToken {
    grant_type: typeof grantTypeToken;
    refresh_token: string;
  }

  type RequestAccessTokenBody = RequestAccessTokenBodyViaCode | RequestAccessTokenBodyViaToken;
}
