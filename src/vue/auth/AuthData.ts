type IClaimValue = string | Array<string>;

export interface IAuthData {
  isAuthenticated: boolean;
  expires: number;
  userId?: string;
  name?: string;
  email?: string;
  displayName?: string;
  culture?: string;
  role?: string;

  get(claimType: string): IClaimValue | undefined;
  hasPermission(value: string): boolean;
}

export class AuthData implements IAuthData {
  private _decodedToken: Record<string, any>;
  isAuthenticated: boolean;
  expires: number;
  userId?: string;
  name?: string;
  email?: string;
  displayName?: string;
  culture?: string;
  role?: string | undefined;

  constructor(token?: string, options: { isAuthenticated: boolean } = { isAuthenticated: false }) {
    this._decodedToken = token != null ? JSON.parse(window.atob(token.split(".")[1])) : {};
    this.isAuthenticated = options.isAuthenticated;
    this.expires = (this._decodedToken.exp ?? 0) - (this._decodedToken.nbf ?? 0);
    this.userId = this.get("sub") as string;
    this.name = this.get("name") as string;
    this.email = this.get("email") as string;
    this.displayName = this.get("displayName") as string;
    this.culture = this.get("culture") as string;
  }

  get(claimType: string): IClaimValue | undefined {
    return this._decodedToken[claimType];
  }
  hasPermission(value: string): boolean {
    const claimValue = this.get("permissions");
    return Array.isArray(claimValue) ? claimValue.includes(value) : claimValue == value;
  }
}

export default AuthData;
