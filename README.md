# Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Contribution](#contribution)
- [License](#license)
- [Questions](#questions)

## Description
This Social Network API application is built using Express.js, MongoDB, and Mongoose ODM. It serves as the backend for a social network web application, allowing users to share thoughts, react to friends' thoughts, and manage a friend list. This API provides CRUD operations for users and thoughts, as well as functionality for managing friend lists and reactions.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/social-network-api.git
    ```
2. Navigate into the project directory:
    ```bash
    cd social-network-api
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Ensure MongoDB is installed and running on your local machine. Alternatively, you can connect to a remote MongoDB instance by updating the connection string in `src/config/connection.ts`.

## Usage
1. Start the application server:
    ```bash
    npm start
    ```
2. Once the server is running, you can interact with the API through Insomnia or another API testing tool.

3. **Video Demonstration**: A walkthrough video demonstrating the functionality of the application, including how to start the server, and examples of the available API routes, can be viewed [HERE](https://drive.google.com/file/d/1zRkj2BKougDW8AKlV6l6BBvcfw0LriOb/view?usp=sharing).

## Routes
The following routes are available in the API. All routes are based on RESTful principles.

### Users
- **GET** `/api/users` - Retrieves all users.
- **GET** `/api/users/:userId` - Retrieves a single user by ID, including thought and friend data.
- **POST** `/api/users` - Creates a new user.
  - Example body:
    ```json
    {
      "username": "exampleUser",
      "email": "user@example.com"
    }
    ```
- **PUT** `/api/users/:userId` - Updates a user by ID.
- **DELETE** `/api/users/:userId` - Deletes a user by ID and removes associated thoughts.
- **POST** `/api/users/:userId/friends/:friendId` - Adds a friend to a user’s friend list.
- **DELETE** `/api/users/:userId/friends/:friendId` - Removes a friend from a user’s friend list.

### Thoughts
- **GET** `/api/thoughts` - Retrieves all thoughts.
- **GET** `/api/thoughts/:thoughtId` - Retrieves a single thought by ID.
- **POST** `/api/thoughts` - Creates a new thought and associates it with a user.
  - Example body:
    ```json
    {
      "thoughtText": "Here's a new thought!",
      "username": "exampleUser",
      "userId": "USER_ID"
    }
    ```
- **PUT** `/api/thoughts/:thoughtId` - Updates a thought by ID.
- **DELETE** `/api/thoughts/:thoughtId` - Deletes a thought by ID.

### Reactions
- **POST** `/api/thoughts/:thoughtId/reactions` - Adds a reaction to a thought.
  - Example body:
    ```json
    {
      "reactionBody": "Nice thought!",
      "username": "anotherUser"
    }
    ```
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Removes a reaction from a thought by reaction ID.

## Contribution
Eric Neff

## License
This project is licensed under the MIT license.

## Questions
If you have any questions, you can reach me through my GitHub [github/eric7string](https://www.github.com/eric7string) or via email at emn531@gmail.com.
