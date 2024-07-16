
# Hotel Booking Application

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Usage Guidelines](#usage-guidelines)

## Introduction

A hotel booking application built with React and Django. This application allows users to search for hotels, make bookings, and view booking history. The app ensures secure authentication using JWT tokens and provides a smooth user experience with a responsive design.

## Features

- User authentication (login/signup)
- Hotel search and booking
- View booking history
- Responsive design
- Protected routes for authenticated users

## Project Structure

```
travel_booking/
├── backend/
│   ├── travel_booking/
│   │   ├── hotel/
│   │   ├── user/
│   │   ├── manage.py
│   └── Pipfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

### Backend Structure

- **travel_booking/**: Project settings and configurations.
- **hotels/**: Hotel-related models, views, and serializers.
- **bookings/**: Booking-related models, views, and serializers.
- **users/**: User authentication and profile management.
- **manage.py**: Django command-line utility.
- **requirements.txt**: Python dependencies.

### Frontend Structure

- **public/**: Public assets and HTML file.
- **src/**
  - **api/**: API files.
  - **components/**: Reusable React components.
  - **contexts/**: Context providers for state management.
  - **App.js**: Main application component.
  - **index.js**: Entry point for the React application.
- **package.json**: Project dependencies and scripts.

## Setup Instructions

### Prerequisites

- Node.js (>=18.x)
- Python (>=3.7)
- Django (>=3.x)
- PostgreSQL (or another supported database)

### Backend Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/aishwary08/travel_booking.git
    cd travel_booking/backend
    ```

2. **Create a virtual environment and activate it:**

    ```sh
    pip install pipenv
    pipenv shell
    ```

3. **Install the required dependencies:**

    ```sh
    pipenv install
    ```

4. **Configure the database:**

    Update the `DATABASES` setting in `travel_booking/settings.py` to match your database configuration.

5. **Run migrations:**

    ```sh
    python manage.py migrate
    ```

6. **Create a superuser:**

    ```sh
    python manage.py createsuperuser
    ```

7. **Start the Django development server:**

    ```sh
    python manage.py runserver
    ```
    
8. **Add hotels via Django admin:**

    Navigate to `http://localhost:8000/admin` and log in with the superuser credentials you created. Use the admin interface to add hotels to the database.

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```sh
    cd ../frontend
    ```

2. **Install the required dependencies:**

    ```sh
    npm install
    ```

3. **Start the React development server:**

    ```sh
    npm start
    ```

## Usage Guidelines

### Running the Application

1. Ensure the Django server is running:

    ```sh
    cd backend
    pipenv shell
    python manage.py runserver
    ```

2. In a separate terminal, start the React development server:

    ```sh
    cd frontend/travel_booking
    npm start
    ```

3. Open your web browser and navigate to `http://localhost:3000`.

### User Authentication

- **Sign Up**: Navigate to `/signup` to create a new account.
- **Log In**: Navigate to `/login` to access your account.

### Booking Hotels

1. Use the search functionality to find hotels by location and date.
2. Select a hotel and proceed to book by specifying check-in and check-out dates.
3. View your booking history under the `Booking History` section.


