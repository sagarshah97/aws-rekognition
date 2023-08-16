# Secure Access - Facial Verification for Enhanced Resource Protection

This project developed using AWS and ReactJS, aimed at enhancing security and user experience in accessing resources. This solution integrates facial verification powered by AWS Rekognition with a robust backend infrastructure, offering a seamless and secure access control system.

## Objectives:

The project aims to revolutionize access control through facial verification by achieving the following objectives:

- Develop a reliable and secure system to differentiate between registered and new users.
- Utilize AWS services, including DynamoDB, Lambda functions, Rekognition, and API Gateway, to automate various authentication processes.
- Implement a user-friendly ReactJS frontend that integrates seamlessly with the backend services.
- Enhance security by implementing token-based access and automated expiration for resource access.

## Goals:

The project seeks to accomplish the following goals:

- **Enhanced Security**: Facial verification ensures that only authorized individuals gain access to resources.
- **Seamless User Experience**: Users can register, login, and access resources with ease, driven by the user-friendly ReactJS frontend.
- **Efficiency**: Automated processes eliminate manual intervention, expediting authentication and resource access.
- **Cloud Automation**: Achieves 100% infrastructure automation through AWS CloudFormation, minimizing setup complexity.
- **Privacy**: Secure token-based system and facial data privacy enhance user confidence in the solution's security.

## Built with:

- **AWS Services**: DynamoDB, Lambda functions, Rekognition, API Gateway, S3
- **Frontend**: ReactJS

## Pre-requisites:

- Download and install [Node.js](https://nodejs.org/en/download)
- Clone this repository.
  - Backend:
    - Log into your AWS Account.
    - In the given `aws-cloud-formation.yml` update the IAM Role as per your requirement. (Make sure your role has access to given resources.)
    - Create the stack using this template.
    - From the `Outputs` section, copy the `ApiGatewayEndpoint` and `ApiKey` to the `.env` file in the frontend.
  - Frontend:
    - Type the following commands: `npm install` and `npm start`

## Sources used:

- Images and icons:
  - <a href="https://www.freepik.com/free-vector/face-recognition-data-safety-mobile-phone-users-getting-access-data-after-biometrical-checking-verification-personal-id-access-identification-concept_10606444.htm#query=face%20id&position=3&from_view=search&track=ais">Image by pch.vector </a>on Freepik
  - Face ID Icon by Pamela from<a href="https://thenounproject.com/browse/icons/term/face-id/" target="_blank" title="Face ID Icons"> Noun Project </a>(CC BY 3.0)
  - <a href="https://www.freepik.com/free-vector/illustration-data-analysis-graph_2808061.htm#query=sales%20graph&position=1&from_view=search&track=ais">Image by rawpixel.com </a>on Freepik
  - <a href="https://www.freepik.com/free-vector/illustration-data-analysis-graph_2808057.htm#query=sales%20graph&position=0&from_view=search&track=ais">Image by rawpixel.com </a>on Freepik
