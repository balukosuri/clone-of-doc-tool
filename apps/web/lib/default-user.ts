// Default user for no-auth mode
export const DEFAULT_USER = {
  id: 'default-user-id',
  name: 'Default User',
  email: 'user@docbolt.local',
  image: null,
};

export function getDefaultUser() {
  return DEFAULT_USER;
}
