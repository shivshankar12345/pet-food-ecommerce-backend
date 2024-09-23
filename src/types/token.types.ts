export type AccessTokenData = {
  accessToken: string;
};

export type RefreshTokenData = {
  refreshToken: string;
};

export type AccessAndRefreshTokenData = AccessTokenData & RefreshTokenData;

export type VerifyTokenPayload = {
  status: boolean;
  message?: string;
};
