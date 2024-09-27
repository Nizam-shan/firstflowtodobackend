# voash-backend

voash server created using Node.js

Project Structure

- Express.js: Used as the server framework to handle API requests.
- MongoDB: Database used for storing user and customer information.
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
- JWT (JSON Web Token): Used for secure user authentication.
- bcrypt: Library for hashing passwords.

Environment Setup

1. Clone repository:

   - git clone

2. Install Dependencies:

3. Configuration:

- Create a `.env` file for environment variables

4. Run the server:

- npm start

Functionality
Authentication - Login API: Validates user credentials and returns a JWT token on successful authentication. - Protected Routes: Secure API endpoints using JWT to ensure only authenticated users can access them.

Crud Management
add :user can add task
delete : user can delete
update: user can delete that task
status change: user can change status to pending ,completed or in-progress

Security Considerations

- Password Hashing: Used bcrypt to hash passwords before storing them in the database.
- JWT: Secured routes using JWT to ensure only authenticated users can access sensitive data.
- Environment Variables: Stored sensitive information in environment variables and do not expose them in the codebase.
