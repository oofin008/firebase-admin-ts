
export const ALL_ROLES = ["admin", "user", "moderator"];

type RoleTuple = typeof ALL_ROLES;

export type Role = RoleTuple[number];
