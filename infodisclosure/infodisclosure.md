# Tampering

This example demonstrates information disclosure by injecting malicious query objects to a NoSQL database.

## Steps to reproduce

1. Install all dependencies

    `$ npm install`

2. Insert test data in the MongoDB database. Make sure the mongod is up and running by typing the `mongosh` command in the termainal. If mongod process is up then you will see that the connection was successful. Command to insert test data:

    `$ npx ts-node insert-test-users.ts`

-- Run mongosh

This will create a database in MongoDB called __infodisclosure__. Verify its presence by connecting with mongosh and running the command `show dbs;`.

2. Start the **insecure.ts** server

    `$ npx ts-node insecure.ts`

3. In the browser, pretend to be a hacker and type a malicious request
(by putting username != null so we get 1)

    ```
        http://localhost:3000/userinfo?username[$ne]=
    ```

4. Do you see user information being displayed despite the malicious request not having a valid username in the request?

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**

Examples of Information disclosure are not hashing or encrypting your data, or inappropriate permissions, or console.log'ing hints or such, or not having good access control mechanisms. Insecure.ts has some security vulnerabilities; lack of sanitizing of the username could allow for code injections, logging the username to the console is an example of leaking data and could expose information to a malicious user, and particularly, User.findOne uses the unverified information from the HTTP request, which could be attacker controlled. 

2. Briefly explain how a malicious attacker can exploit them.

A malicious attacker could exploit these in several ways to get information about users; they could analyze console.logs to obtain usernames, they could attempt to pass in a code injection through req.query, and they could access privaledged information through User.findOne. So this is an information disclosure vulnerability carried out by tampering. 

3. Briefly explain the defensive techniques used in **secure.ts** to prevent the information disclosure vulnerability?

In secure.ts, we improve the code so that it checks the username type to ensure it is a string, adds a try/catch block to the database query which adds resilience against errors, and adds sanitization to the username that was passed to ensure if any code values were passed they are replaced and are not able to be passed in to the database. One of the remaining vulnerabilities here is returning the error code, which gives information back to the hacker than could help them. 