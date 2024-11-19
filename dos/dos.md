# Denial-of-Service (DoS)

This example demonstrates DoS vulnerabilities and how they can be exploited.

## Steps to reproduce

1. Install all dependencies

    `$ npm install`

2. Ignore if you have already done this once. Insert test data in the MongoDB database. Make sure the mongod is up and running by typing the `mongosh` command in the termainal. If mongod process is up then you will see that the connection was successful. Command to insert test data:

    `$ npx ts-node insert-test-users.ts`

This will create a database in MongoDB called __infodisclosure__. Verify its presence by connecting with mongosh and running the command `show dbs;`.

2. Start the **insecure.ts** server

    `$ npx ts-node insecure.ts`

3. In the browser, pretend to be a hacker and type a malicious request

    ```
        http://localhost:3000/userinfo?id[$ne]=
    ```

4. Do you see the server crashing?

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts** that can lead to a DoS attack.

The vulnerabilty in insecure.ts primarily comes from not catching any errors that could be produced by the findOne database call, and supported by not sanitizing the id input. 

2. Briefly explain how a malicious attacker can exploit them.

If an invalid id input is passed in, the database call could produce an uncaught error, which would crash the server because it is not being caught. A hacker could do this repetedly, which would result in a DOS attack, keeping the server down. Specifically this produced a BSONError, triggering the requirement that the id input is a 24 character string. 

3. Briefly explain the defensive techniques used in **secure.ts** to prevent the DoS vulnerability?

Secure.ts makes several improvements to this code.  It fixes the above discribed vulnerability by adding a try/catch block so that if the database does produce an error (for whatever reason), it will be caught and not resultingly crashing the server. It also catches the error which provides additional protection by not hinting at the error to the hacker. It also adds a middleware rate limiter which restricts any hacker from sending requests to frequently (no more than one every 5 seconds), and could also be increased. The code  could be further improved by adding another layer of security by sanitizing the id input as well. 