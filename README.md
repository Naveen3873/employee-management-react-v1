# Getting Started with Create React App

# Authentication and Authorization System

This project implements an authentication and authorization system for two types of users: admin and user. Users can sign up, log in, and manage their profiles. Admins have access to a dashboard to manage user submissions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

### User Authentication and Registration

- **Sign Up:** Users can register with fields including name, email, phone number, description, profile photo, password, and salary.
- **Email Confirmation:** Upon successful registration, users receive an email confirmation.

### User Portal

- **Login:** Registered users can log in to access their profile details.
- **Profile Management:** Users can view and edit their profile details, including salary.

### Admin Panel

- **Admin Dashboard:** Admins have access to an admin dashboard.
- **User Submissions:** Admins can view a list of user submissions.
- **Approval Workflow:** Admins can approve or reject each user submission.

### Financial Details

- **Tax Calculation:** Display tax amount based on user salary:
  - 10% if salary is below 10 LPA (Lakh Per Annum)
  - 20% if salary is between 11 LPA and 20 LPA
  - 30% if salary is between 21 LPA and 30 LPA

- **Basic Salary:** Display basic salary based on salary range:
  - 25% of salary if below 10 LPA
  - 50% of salary if between 11 LPA and 20 LPA
  - 75% of salary if between 21 LPA and 30 LPA

- **PF Amount:** Calculate PF (Provident Fund) amount based on basic salary (12% of basic salary).

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    - ```bash
    - git clone https://github.com/Naveen3873/employee-management-react-v1.git

2. Navigate into the project directory:
    - cd project-directory

3. Install dependencies:
    - npm install

## Usage

1. Start the development server:
    - npm start

2. Open your browser and go to http://localhost:3000 to view the project.