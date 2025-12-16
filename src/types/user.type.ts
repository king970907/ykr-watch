export const UserRole = {
  ADMIN: "ADMIN",
  VIEWER: "VIEWER",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface IUser {
  id: string;
  name: string;
  role: UserRoleType;
  avatar: string;
}
