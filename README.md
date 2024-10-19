# Project Desc
This is backend for AAA (Authen, Account, Authorization)
using Firebase, Cloud function stacks.
written in Typescript with Microservices architecture.

# Tech stacks
Firebase function, firestore, typescript

# Prerequisite
have firebase cli installed 
node version >= 16

# Getting start
In `functions` folder:
```bash
  npm install
```

In root folder
```bash
  npm install
  npm run start
```

To deploy
```bash
  npm run deploy
```

To get Authorization token for Postman, when request to firebase function on prod
```bash
  gcloud auth print-identity-token
``` 
Then copy the token and paste to Postman Authorization header with type Bearer Token