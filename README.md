# **Student App**

The **Student App** is a web application built with React for managing and tracking students' marks using their roll numbers. It integrates with a MongoDB cluster for data storage and utilizes **ngrok** for secure tunneling.

## **Features**

- **Add Student**: Add a new student with their name, roll number, and scores for various subjects (Java, CPP, Python, GenAI, FSD).
- **View Students**: View a list of all students along with their marks.
- **Edit Student**: Update a student's marks directly from the table.
- **Delete Student**: Remove a student from the database by roll number.

---

## **Technologies Used**

- **Frontend**: React, JSX, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Tunneling**: ngrok

---

## **Setup Instructions**

### **Frontend Setup**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd student-app

**Backend Setup**

1. Navigate to the backend folder:
  ```bash
  cd backend
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Set up environment variables (Create a `.env` file in the backend directory with the following):
  ```
  REACT_APP_API_BASE = "http://localhost:3001"  
  DATABASE_URL = "your-database-url"
  ```

4. Start the backend server:
  ```bash
  npm start
  ```

**ngrok Setup**

1. Install ngrok (if not already installed):
  ```bash
  npm install -g ngrok
  ```

2. Start ngrok for backend tunneling:
  ```bash
  ngrok http 3001
  ```

3. Copy the public URL provided by ngrok and update your frontend API calls to use this URL.


**Project Structure**

```
project/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.js
│   └── ...
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
└── package.json
```

**(Note:** The `package.json` file would contain the necessary dependencies for both the frontend and backend.)

**(Note 2):**  The `Project Structure` is a visual representation, not executable code. The entries under each folder would contain actual files and their contents. The structure describes the typical layout of a project with a frontend (React) and a backend (Node.js/Express). The specific file names and folder contents are not shown, as only a directory structure and descriptions are present in the original image.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
