# SecretMessage

**SecretMessage** is a fun and anonymous message-sending platform built using **React**, **Node.js**, **Express**, and **MongoDB**. It allows users to receive messages from others without revealing their identities. Whether you're curious to know what others think or just want to have some fun, SecretMessage is the perfect platform for anonymous interactions.  

---

## 🚀 Features

- **Anonymous Messaging**: Send and receive messages without revealing your identity.
- **Fun and Engaging**: Designed purely for entertainment purposes.
- **Simple Interface**: Easy-to-use and intuitive design for smooth user experience.
- **Secure and Private**: Messages are securely stored using MongoDB.

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js and Express.js  
- **Database**: MongoDB  
- **Hosting**: (Add hosting details if applicable, e.g., Vercel, Netlify, etc.)  



## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites
- Node.js installed on your system.
- MongoDB instance (local or cloud-based like MongoDB Atlas).

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/SecretMessage.git
   cd SecretMessage

2. Install dependencies for both frontend and backend:

   ``` bash
    cd frontend
    npm install
    cd ../backend
    npm install
3. Create a .env file in the backend directory with the following variables:

    ```bash
    MONGO_URI=your-mongodb-connection-string
    PORT=5000
4. Start the development servers:
 - Backend:
   ```bash
   cd backend
   npm start
 - Frontend:
   ```bash
    cd frontend
    npm start

  5. Open the app in your browser:
Visit `http://localhost:5137`



### 🐳 Docker Compose
Easily run the SecretMessage platform using Docker Compose for streamlined setup and deployment.

**Steps to Run**
1) Clone the Repository
```bash
git clone https://github.com/ironsummit72/secret-message.git
cd secret-message
```
2) Build and Start Services
    Run the following command to build and start the services:
```bash
docker-compose up --build
```
3) Stop Services
   To stop the services,press `CTRL+C` and run:

```bash
docker-compose down
```
   
 

# 📝 Disclaimer
**SecretMessage** is designed for entertainment only. We encourage users to use this platform respectfully and responsibly.
