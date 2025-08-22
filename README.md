# crawl-nettruyen

This project is a web application designed to crawl and display comic data from Nettruyen. It consists of two main parts: a Backend API and a Frontend web application.

## Backend

The backend is built with **Node.js** and **Express.js**. It serves as the API layer for the frontend, handling data crawling, storage, and retrieval.

- **Technology Stack:** Node.js, Express.js, Sequelize (ORM), MySQL (Database), Puppeteer, Nightmare (for crawling).
- **Key Features:**
  - Crawls comic information (name, slug, thumbnail, original URL).
  - Crawls chapter details (title, slug, URL, number, image content).
  - Stores comic and chapter data in a MySQL database.
  - Provides RESTful API endpoints for fetching comic lists, comic details by slug, and chapter details by comic and chapter slug.
  - Includes a proxy endpoint (`/api/v1/chapter-image`) to fetch chapter images with a `Referer` header, bypassing hotlinking protection.

## Frontend

The frontend is a **React** application that consumes the backend API to display comic data to users.

- **Technology Stack:** React, Vite (build tool), React Router DOM (for navigation), Axios (for HTTP requests), SCSS Modules (for styling).
- **Key Features:**
  - Displays a list of comics (Home page).
  - Shows detailed information for a selected comic, including its name, thumbnail, and a list of available chapters (Comic Detail page).
  - Allows users to navigate to a specific chapter to view its images (Chapter Detail page).
  - Utilizes the backend image proxy to correctly display chapter images that might have hotlinking protection.

---

**Note:** This `README.md` provides a high-level overview. For detailed setup and usage instructions, please refer to specific documentation within the `backend` and `frontend` directories.
