# Metaverse Connect

Metaverse Connect is a simple MERN (MongoDB, Express, React, Node.js) project that allows users to connect with other users in a virtual world, also known as a metaverse. This project also implements AWS secrets management to securely store sensitive information such as API keys and passwords.

## Getting Started

To get started with Metaverse Connect, follow these steps:

1. Clone this repository to your local machine
2. Install Node.js and MongoDB if you haven't already
3. Navigate to the project directory and install dependencies by running `npm install` in the root directory, as well as in the client directory
4. Set up an AWS account and create a secrets manager to store your sensitive information. Replace the placeholders in the `.env` file with your secrets' ARNs (Amazon Resource Names)
5. Start the development server by running `npm run dev` in the root directory. This should start the server and client at the same time.

## Features

Metaverse Connect currently has the following features:

- User authentication and authorization with JWT (JSON Web Tokens)
- User profiles with avatars and status updates
- Ability to search for and connect with other users
- Real-time messaging with other connected users using Socket.IO

## Technologies Used

Metaverse Connect uses the following technologies:

- MongoDB for the database
- Express.js for the server
- React.js for the client-side
- Node.js for the runtime environment
- AWS Secrets Manager for securely storing sensitive information
- JSON Web Tokens (JWT) for user authentication and authorization
- Socket.IO for real-time messaging

## Contributing

If you would like to contribute to Metaverse Connect, feel free to submit a pull request. You can also create issues if you encounter any bugs or have suggestions for new features.

## License

Metaverse Connect is licensed under the MIT license. See the `LICENSE` file for more details.
