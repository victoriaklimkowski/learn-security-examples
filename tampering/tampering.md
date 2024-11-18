# Tampering

This example demonstrates tampering through script injection.

## Steps to reproduce

1. Install all dependencies

    `npm install`

2. Start the **insecure.ts** server

    `npx ts-node insecure.ts`

3. In the browser, type a potentially malicious script in the name field of the form

    ```
        <script> document.body.innerHTML = "<a href='https://google.com'> Gotcha </a>"</script>
    ```

4. Do you see the potentially malicious hyperlink being injected into the form?

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**

The tampering vulnerability in insecure.ts is due to reading in input data from the user without sanitizing it. In the app.post("/register"...) block we read in req.body.name as a String and whatever that string may contain. If executable code is passed in as part of this string, it could be executed on the system and expose an assortment of things. 

2. Briefly explain how a malicious attacker can exploit them.

A malicious attacker could exploit this in a number of ways, most dangerously by passing in executable code. This executable code could change the user type, insert a redirection link, expose additional page data, etc. 

3. Briefly explain why **secure.ts** does not have the same vulnerabilties?

In secure.ts the code uses a function we define locally called escapeHTML to replace any executable characters like "<>" with escaped characters, rendering any executable code as a harmless string. There are numerous other ways of doing this like using the npm package or restricting user input of characters using a check (e.g. no special characters in username allowed). The important point here is that no matter how you sanitize your input, you must ensure that all input from the user is sanitized. 