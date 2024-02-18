# KYL Blog Project

![image](https://github.com/NayanMallet/KYL/assets/81246812/6744da3d-81bb-440c-b15b-163211d6572f)

## Overview
KYL Blog Project is a web application developed to create a blog focused on O£IL music. The goal of this project was to implement accessibility features and best practices to ensure an inclusive and user-friendly experience for all users.

## Features
- **Accessible Design**: The website is designed with accessibility in mind, following WCAG 2.0 guidelines to ensure that users with disabilities can access and navigate the content easily.
- **Dynamic Article Loading**: Articles are loaded dynamically onto the page, improving performance and user experience.
- **Article Preview**: Users can preview articles without leaving the main page by clicking on "Read More".
- **Responsive Design**: The website is responsive and optimized for various screen sizes and devices.

## Technologies Used
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Express.js (for API endpoints)
- **Database**: Supabases (for storing users, articles and comments)

## Accessibility Features
- **Semantic HTML**: Proper use of semantic HTML elements to enhance accessibility and provide meaningful structure to the content.
- **Keyboard Navigation**: All interactive elements are accessible via keyboard navigation, allowing users to navigate the site without a mouse.
- **Alt Text for Images**: Images include descriptive alt text to ensure accessibility for users who rely on screen readers.
- **ARIA Attributes**: ARIA attributes are used to enhance accessibility for dynamic content, such as modal dialogs and article previews.
- **Focus Management**: Focus is managed properly to ensure that keyboard users can navigate the site efficiently.

## Deployment
The project is deployed on [Vercel](https://vercel.com/), a cloud platform for static sites and serverless functions. The deployment process is automated, and the application is continuously monitored for performance and accessibility.

## How to Run Locally
1. Clone the repository: `git clone https://github.com/yourusername/kyl-blog.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Access the application in your web browser: `http://localhost:3000`
