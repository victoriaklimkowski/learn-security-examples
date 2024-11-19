# Privilege Escalation

The example demonstrates a privilege escalation vulnerability and how to exploit it.

## Steps to reproduce

1. Install all dependencies

    `$ npm install`

2. Start the **insecure.ts** server

    `$ npx ts-node insecure.ts`

3. In the browser, send a GET request

    ```
        http://localhost:3000/send-form
    ```

4. Try different UserIds and see which one gives you authorized access to change the role of that user.

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**

Insecure.ts's main vulnerability comes from reading the user data from an untrustworthy source. 

2. Briefly explain how a malicious attacker can exploit them.

With the way insecure.ts is designed, you pretty much only need to know a user Admin's id in order to access the ability to escalate privaledges. A malicious attacker could exploit this vulnerability by using a user admin id then granting themselves privaledged access. 

3. Briefly explain the defensive techniques used in **secure.ts** to prevent the privilege escalation vulnerability?

Instead of reading in data from the request body, secure.ts improves on the design by reading the user information from sessions instead. This assumes session is configured correctly, which is a seperate issue. A remaining vulnerability in this code is hardcoding the secret in the session information, as covered in spoofing. 