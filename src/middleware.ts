import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(["/generate-program", "/profile"]);
export default clerkMiddleware(async(auth, req) =>{
  if (isProtectedRoute(req)) await auth.protect();
}); // to prevent access to profile and generate-program routes without authentication
// redirects to sign-in page if not authenticated

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};