# Nebula File Storage Application

Nebula is a file storage application built using React and Firebase. It allows users to securely upload, store, and manage files in the cloud. This README provides an overview of the project, installation instructions, and usage guidelines.

## Features

- **User Authentication**: Secure authentication using Firebase Authentication.
- **File Upload**: Upload files directly to Firebase Storage.
- **File Management**: View, download, and delete files.
- **Responsive Design**: Mobile-friendly interface built with React Bootstrap.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Firebase**: Backend-as-a-Service (BaaS) for authentication, storage, and database.
- **React Bootstrap**: CSS framework for responsive design components.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/royaals/nebula-cloud-storage.git
   ```
   
2. Navigate into the project directory:
   ```
   cd nebula
   ```

3. Install dependencies using npm:
   ```
   npm install
   ```

4. Create a Firebase project ([Firebase Console](https://console.firebase.google.com/)) and set up Firebase Authentication and Firebase Storage.

5. Create a `.env` file in the root directory of your project with the following Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=<your_api_key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
   REACT_APP_FIREBASE_PROJECT_ID=<your_project_id>
   REACT_APP_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_messaging_sender_id>
   REACT_APP_FIREBASE_APP_ID=<your_app_id>
   ```

6. Start the development server:
   ```
   npm start
   ```

7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- Sign up or log in using your email and password.
- Upload files using the upload button.
- View uploaded files in the dashboard.
- Click on a file to download it.
- Click the delete button to remove a file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

