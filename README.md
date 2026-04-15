# Priva-Sync

Under the project Priva - Sync I had tried to develop a secure full-stack chatbot application built using React, Node.js, Express, MongoDB, and JWT authentication.

---

# Full System Flow

The application follows this complete full-stack cycle:

The system here is following the below given order. 

Step - 1 -> The user opens browser.

Step - 2 -> The frontend(made with the help of react) React page loads.

Step - 3 -> The user enters data, related to the login credentials. 

Step - 4 -> Axios sends request to backend. 

Step - 5 -> The backend receives request, related to the login and registration of a new user. 

Step - 6 -> Backend checks logic(under the logic, it is ensured that each of the creadential is filled), DB(this ensures that duplicate data dosen't exists in the log) / JWT(impoortant for authentication of the user)

Step - 7 -> Backend sends response

Step - 8 -> Frontend updates the user interferance.

This is the real full-stack communication cycle used in the project. 

---

# Project Folder Structure

```text
Priva-Sync
│
├── frontend
├── backend
```

---

# Frontend Explanation

The frontend is built using React.

Its responsibilities are:

* Taking user input
* Displaying responses
* Sending requests to backend APIs

---

## App.jsx

This file handles application routing.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
</BrowserRouter>
```

### Explanation

* **BrowserRouter** creates routing capability, i.e., to navigate between different pages. 
* **Routes** groups route definitions.
* **Route** maps URL paths to components.

Example:

```jsx
<Route path="/login" element={<Login />} />
```
This part is needed for the nagivation and the connection between the pages. 

means:

```text
localhost:5173/login opens Login page
```
As, the code is nagigating to this page. 
---

## Signup.jsx

This file handles user registration.

### Imports

```jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
```

### Explanation

* **useState** stores changing input values.
* **axios** sends HTTP requests to backend.
* **useNavigate** redirects user after signup.

### Example state

```jsx
const [name, setName] = useState("");
```

This means:

* The `name` stores current value
* `setName()` updates value of the `name`

### Input handling

```jsx
onChange={(e) => setName(e.target.value)}
```

Whenever user types, value is stored instantly.

### Signup request

```jsx
axios.post("http://localhost:5000/api/auth/signup", {...})
```

This sends signup data to backend.

### After success

```jsx
navigate("/login");
```
After succesful registratiob for the chatbot, now we navigate towards the login page for logging into the chat bot system. 

---

## Login.jsx

This handles user login.

### Important line

```jsx
localStorage.setItem("token", response.data.token);
```

### Explanation

The JWT token received from backend is stored in browser local storage.

Why required:

* Token survives page refresh
* Used later for protected routes

### After success

```jsx
navigate("/chat");
```

If the verification by JWT is done, then we navigate towards the chat page. 

---

## Chat.jsx

This is the protected chatbot interface.

### Read token

```jsx
const token = localStorage.getItem("token");
```

This fetches saved JWT token.

### Protected request

```jsx
headers: {
  Authorization: `Bearer ${token}`
}
```

This sends token to backend.

### Why required

Backend uses token to verify user identity.

### Chat storage

```jsx
const [messages, setMessages] = useState([]);
```

An array is used so chat history can be stored.

Each message is saved as:

```jsx
{
 user: prompt,
 bot: response.data.reply
}
```

### Logout

```jsx
localStorage.removeItem("token");
```
The token present here, gets logged out.
And, the token is also removed. 

---

# Backend Explanation

Backend is built using Express.js.

Its responsibilities are:

* Receive requests
* Process logic
* Access database
* Return responses

---

## server.js

Main backend entry point.

### Core imports

```js
const express = require("express");
const cors = require("cors");
```
The CORS is very important as, this leds to the communication between the backend and the frontend. 

### Explanation

* **express** creates server
* **cors** allows frontend and backend communication

Without CORS:

```text
Browser blocks API requests
```

### JSON parsing

```js
app.use(express.json());
```

Without this:

```text
req.body becomes undefined
```

### Routes

```js
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
```

This means:

* `/api/auth/signup` goes to auth routes
* `/api/chat` goes to chat routes

---

## config/db.js

Connects MongoDB.

### Core line

```js
mongoose.connect(process.env.MONGO_URI)
```

### Explanation

Database URL is read from `.env`.

Why `.env` is used:

* Keeps credentials hidden
* Avoids hardcoding secrets

---

## models/User.js

Defines user schema.

### Schema fields

* name
* email
* password

### Why schema is required

Without schema:

```text
MongoDB data becomes uncontrolled
```

---

## authController.js

Contains signup and login logic.

---

### Signup flow

#### Read request

```js
req.body
```

#### Hash password

Uses bcryptjs:

```js
bcrypt.hash(password, 10)
```

Why hashing is required:

```text
Passwords must never be stored as plain text
```

#### Save user

```js
await User.create(...)
```

---

### Login flow

#### Find user

```js
User.findOne({ email })
```

#### Compare password

```js
bcrypt.compare(...)
```

#### Generate JWT

```js
jwt.sign(...)
```

Token contains:

* user id

---

## authMiddleware.js

Protects private routes.

### Read token

```js
req.headers.authorization
```

### Verify token

```js
jwt.verify(...)
```

### Result

If valid:

```text
Allow next()
```

If invalid:

```text
Reject request
```

---

## authRoutes.js

Maps auth URLs to controllers.

```js
router.post("/signup", signup)
```

Meaning:

```text
POST /api/auth/signup → signup function
```

---

## chatRoutes.js

Protected chatbot route.

```js
router.post("/", authMiddleware, chat)
```

Meaning:

Before chat executes:

```text
JWT check happens first
```

---

## chatController.js

Handles chatbot reply generation.

### Prompt received

```js
req.body.prompt
```

### Response generated

Current fallback logic checks prompt and returns suitable reply.

Example:

If prompt contains:

```text
hello
```

reply becomes:

```text
Hello! How can I help you today?
```

In, mycase it was the expected output, but this is not comming, as my limit for execution has reached on GOOGLE Gemeni. 
---

# Why Backend Checks Logic / DB / JWT

Backend always verifies three things:

---

## Logic Check

Ensures request follows program rules.

Example:

* empty fields rejected
* invalid data rejected

---

## Database Check

Ensures correct stored data usage.

Example:

* duplicate email prevented
* existing user verified

---

## JWT Check

Ensures only logged-in users access protected routes.

Without JWT:

```text
Anyone could call /api/chat directly
```

---

# Full Connection Map

---

## Signup Flow

```text
1. Signup.jsx

2. axios POST

3. authRoutes.js

4. authController.js

User model

5. MongoDB
```

---

## Login Flow

```text
1. Login.jsx

2. axios POST

3. authController login

4. JWT generated

5. token stored in browser
```

---

## Chat Flow

```text
1. Chat.jsx

2. token sent in headers

3. authMiddleware

4. chatController

5. reply returned
```

---

# Technologies Used

* React
* Express.js
* MongoDB
* JWT Authentication

---

# Run Project

For the running the project, the frontend and backend are operated in different terminals. 

## Backend

```bash
cd backend
npm install' --> The npm downloads all the packages and creates the nodes_modules, which were present above. 
node server.js
```

## Frontend

```bash
cd frontend
npm install --> The same logic is here also. 
npm run dev
```

---

# Environment Variables

```
MONGO_URI=mongodb+srv://amritanshukumar2006_db_user:amrit123@programming.y66m6sl.mongodb.net/?appName=Programming
JWT_SECRET=mysecretkey
GEMINI_API_KEY=AIzaSyBZO_3j-2Lzb5G1luzxE2eM_7klkFV9yjo
```
These are the cendentials which are present inside the .env file. 
Mongo is the database which is used for the storage of the informations regardding the users. 
I am using the Gemini for the chatbot, so the API key for the gemini is used. 
