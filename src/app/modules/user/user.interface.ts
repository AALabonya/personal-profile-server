
export const ROLE = {
  admin: 'admin',
} as const;

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRoles;
  image?: string;

};


export type TUserRoles = keyof typeof ROLE;
