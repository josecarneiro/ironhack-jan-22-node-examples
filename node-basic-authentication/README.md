# Plan

## Pages

Home
Private - Only available to authenticated users
Login - Allows existing users to sign in to application
Register - Allows visitors to sign up to application
Error

## Route Handlers

GET - / - Displays home page
GET - /login - Displays login form
POST - /login - Handles login form submission
GET - /register - Displays register form
POST - /register - Handles register form submission
GET - /private - Displays private page to authenticated users only
POST - /logout - Signs out user

## Models

User

- name - String, required
- email - String, required, lowercase
- password - String, required
