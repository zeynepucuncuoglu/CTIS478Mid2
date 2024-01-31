# Product Catalog App

## Overview

This is a simple web application for a product catalog. It allows users to view a list of products, buy items, and see real-time updates on stock changes. The application is built using Node.js, Express.js, Handlebars.js, and Socket.io.

## Features

- View a list of products with details such as ID, name, category, price, and stock.
- Buy products, decrementing the stock count.
- Real-time updates on stock changes using Socket.io.

## Usage
- Access the application in your web browser.
- Browse the product catalog.
- Click the "Buy" button to purchase a product and see real-time stock updates.

## File Structure
- app.js: Main server file with Express and Socket.io setup.
- db.js: Data file containing product and category information.
- views/index.hbs: Handlebars template for rendering the product catalog.
- public/styles.css: CSS file for styling the HTML elements.
