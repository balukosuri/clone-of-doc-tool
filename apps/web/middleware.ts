// No middleware needed - auth removed
export { default } from 'next-auth/middleware';

export const config = {
  matcher: []  // Empty matcher - no routes protected
};
