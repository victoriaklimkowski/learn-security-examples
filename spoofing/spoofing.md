# Spoofing

This example demonstrates spoofind through two ways -- Stealing cookies programmatically and cross site request forgery (CSRF).

## Steps to reproduce the vulnerability

1. Install dependencies

    `$ npx install`

2. Start the **insecure.ts** server

    `npx ts-node insecure.ts`

3. Start the malicious server **mal.ts**

    `npx ts-node mal.ts`

4. Open __http://localhost:8000__ in a browser, type a name and Submit.

5. Open the __Application__ tab in the Browser's inspect pane. Find the __Cookies__ under __Storage__. You should see a __connect.sid__ cookie being set.

6. Open the HTML file __mal-steal-cookie.html__ file in the same browser (different tab). Open inspect and view the console.

7. Click the link in the HTML file. Do you see the cookie being stolen in the console?

8. Open the HTML file __mal-csrf.html__ file in the same browser (different tab). What do you see if the user has not logged out of **insecure.ts**? What do you see if the user has logged out? 


## For you to answer

1. Briefly explain the spoofing vulnerability in **insecure.ts**.

Session is the middleware in this application that intercepts the request and response objects and configures the session id with some parameters.  The session secret is hardcoded in, which introduces the possibility of someone accessing it, e.g. via a console.log statement. In addition, by setting httpOnly to false, this introduces the possibility of programatically manipulating this input. In addition, the user input is not sanitized, which leads to further vulnerability for potential executables to be introduced. 

2. Briefly explain different ways in which vulnerability can be exploited.

There are several ways these vulnerabilities could be exploited. One is that an executable block of code could be passed in as the user's name, which in this case could allow access to the session's secret via a console.log statement accessing the page's data. In addition, the cookie could be intercepted, manipulated, or stolen because httpOnly is set to false. 

3. Briefly explain why **secure.ts** does not have the spoofing vulnerability in **insecure.ts**.

In secure.ts the session secret is set dynamically so it can only be accessed by the person who started the server, as declared at the begining of the file. The app.use statement utilizes this passed in value instead of the hardcoded one in insecure.ts. In addition, two measures have been improved: httpOnly is set to true, allowing only http access, and sameSite is set to true, so access is restricted to the same site. This adds additional layers of security. 