# Quiz App with Timer

Welcome to the Quiz App with Timer! This project is a modern, dynamic quiz application built with a powerful tech stack to provide a seamless user experience.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, DaisyUI, Aceternity UI, Ant Design
- **Backend**: Django, Django REST Framework

## Features

- **Dynamic Quiz Interface**: Enjoy a responsive and interactive quiz experience.
- **Timer Integration**: Each quiz comes with a built-in timer to enhance challenge.
- **User Authentication**: Secure login and signup functionalities.
- **RESTful API**: Efficient communication between the frontend and backend.
- **Beautiful UI Components**: Leveraging DaisyUI, Aceternity UI, and Ant Design for a polished look and feel.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Python
- Django

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Gopala05/Quiz-App-Full-Stack.git
    cd Quiz-App-Full-Stack
    ```

2. **Frontend Setup**
    ```bash
    cd frontend
    npm install
    # or
    yarn install
    ```

3. **Backend Setup**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install <Module_Name>
    ```

### Running the Application

1. **Start the Backend Server**
    ```bash
    cd backend
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
    ```

2. **Start the Frontend Server**
    ```bash
    cd frontend
    npm run dev
    # or
    yarn dev
    ```

### Configuration

- **Environment Variables**: Create a `.env` file in both the frontend and backend directories with the necessary environment variables.

### Deployment

To deploy this application, refer to the documentation for the specific platforms you plan to use (e.g., Vercel for Next.js, Heroku for Django).

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Contact

For any inquiries, please reach out to [your-email@example.com](mailto:your-email@example.com).
