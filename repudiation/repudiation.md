# Repudiation

The example demonstrates a vulnerability that can lead to repudiation by malicious users attempting to access the services provided by a server.

## Steps to reproduce

1. Install all dependencies

    `$ npm install`

2. Run the server __insecure.ts__.

3. Pretend to be a malicous user and interact with the services by sending requests from the browser.

4. Do you think your actions can be repudiated?

## For you to do

1. Briefly explain the vulnerability.

Insecure.ts does not do a good job in repudiation by setting up a robust log. Currently the only thing it logs is to the console, which does not allow us to trace interactions and suspicious activity. 

2. Briefly explain why the vulnerability is addressed in __secure.ts__.

Secure.ts creates a middleware for logging the requests sent in a robust way. It gets triggered on every request since it uses app.use, and stores all the important information we'd need like method of access, url accessed, and the ip address of the requestor. This vulnerability is addressed in order to allow us the ability to track, identify, and follow up on any suspicious activity, allowing for repudiation. 

3. Which design pattern is used in the secure version to address the vulnerability? Briefly explain how it works?

The design pattern used in the secure version is chain of responsibility and works not by preventing or protecting against attacks but by giving us the ability to investigate attacks. 