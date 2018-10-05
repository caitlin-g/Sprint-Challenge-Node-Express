# Review Questions

## What is Node.js?

Node.js is a runtime environment that allows us to write server side Javascript code. This makes it easy to share code between the client and the server when they are both written in javascript.

## What is Express?

Express is a Node.js framework that simplifies writing web applications and web APIs. Using Express means you can write you application with less code.

## Mention two parts of Express that you learned about this week.

Middleware and routing

## What is Middleware?

Middleware are functions that intercept a request and response. They can change the intercepted information, return it, or pass it to the next middleware.

## What is a Resource?

A resource is the response data from the API.

## What can the API return to help clients know if a request was successful?

A response in the form of a status code and/or a JSON object.

## How can we partition our application into sub-applications?

Routing

## What is express.json() and why do we need it?

It formats our req.body object. We need it so the server knows that the req.body is a JSON object and to read it as such.
