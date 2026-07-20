# 📇 Contact Book

A production-ready contact management application built with Next.js and AWS Serverless services.

The application provides secure authentication with Amazon Cognito, image uploads using Amazon S3 pre-signed URLs, and an event-driven backend for asynchronous image cleanup. It demonstrates modern cloud-native architecture using AWS Lambda, API Gateway, EventBridge, and SQS.

🔗 Live Demo: https://contactbook.chrisalex.online

## 🏗️ Architecture

![Contact Book Architecture](docs/architecture.png)


## ✨ Features

- Secure user authentication with Amazon Cognito
- JWT protected REST APIs
- Create, update, delete and view contacts
- Upload up to five contact images
- Direct browser uploads using Amazon S3 pre-signed URLs
- Event-driven image deletion using EventBridge and SQS
- Responsive UI for desktop and mobile devices
- Password reset with email verification
- Client-side form validation with live password requirements
- Automatic HTTPS deployment using AWS Amplify

- ## 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- AWS Amplify

### Backend

- Node.js
- TypeScript
- AWS Lambda
- API Gateway
- Amazon Cognito
- Amazon S3
- Amazon EventBridge
- Amazon SQS
- MongoDB Atlas
- Serverless Framework

- ## 🚀 Highlights

This project focuses on backend architecture rather than only CRUD functionality.

Key implementation highlights include:

- Direct browser uploads using Amazon S3 pre-signed URLs
- Event-driven asynchronous image deletion
- Stateless serverless APIs deployed on AWS Lambda
- Secure JWT authentication using Amazon Cognito
- Responsive frontend built with Next.js App Router
- Production-ready deployment with AWS Amplify
