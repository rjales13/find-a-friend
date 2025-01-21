<h1 align="center">
<br>
    FindAFriend API
</h1>

<p align="center">The Find a Friend API is a platform designed to connect individuals looking to adopt animals with organizations (orgs) that list animals in need of a home. This API provides robust functionality for searching, managing, and filtering animal data based on various attributes, making it easier for users to find their ideal pet. This API is built with Node.js | Fastify | Prisma | Docker | Typescript. There's also Unit an End-to-End tests using Vitest</p>

<hr />

## Features
- **NODEJS**
- **FASTIFY**
- **PRISMA**
- **TYPESCRIPT**
- **DOCKER**
- **VITEST**

## Getting started

- run the command: npm i
- run the command: npm run start:dev

## API Endoints

- Create a User => POST http://localhost:3333/users
- Authenticate a User => POST http://localhost:3333/sessions
- List a User => GET http://localhost:3333/me
    - Having a Bearer Token
- Refresh Token => PATCH http://localhost:3333/token/refresh
- Create a Pet => POST http://localhost:3333/pets
- List a Pet => GET http://localhost:3333/pets/details/PETID
- Search for Pets => GET http://localhost:3333//pets/search/QUERY
- Create a Photo => POST http://localhost:3333/photos
- List a Photo => GET http://localhost:3333/photos/details/PHOTOID
- Create a Requirment => POST http://localhost:3333/requirements
- List a Requirement => GET http://localhost:3333/photos/details/REQUIREMENTID

## NOTES
This app is just the backend part!