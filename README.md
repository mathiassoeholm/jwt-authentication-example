# jwt-authentication-example

The plan:

v1:
Prisma for DB
Serverless functions: signin, signout
useUser hook, null if no user
Only render app if user is logged in otherwise render login/signup (no need for protected routes and redirects)
Simply use fetch to query/mutate the graphql endpoint
Some amount of styling, so demo app doesn't look dumb

v2:
requestReset, resetPassword, Apollo instead of fetch

v3:
TypeScript with types and hooks generated from a schema
