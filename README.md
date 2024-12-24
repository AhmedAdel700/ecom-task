# Product List App

- Project Demo : [ecom](https://ecommerce-task-web.netlify.app/)

- The Product List App is a simple application that allows users to view a list of products, filter them by category, and track the items in their shopping cart. Built with React, the project utilizes localStorage for state management instead of Redux Toolkit, due to uncertainty regarding its allowed usage in the context of this particular project.

- While I refrained from using Redux Toolkit in this instance, I am experienced with it and have applied it in other projects. If you'd like to see an example where I have successfully used Redux Toolkit, feel free to check out my eCommerce application:

- Live Demo: [eCommerce Web](https://web-e-commerce-web.netlify.app/)
- GitHub Repository: [eCommerce GitHub](https://github.com/AhmedAdel700/eCommerce)

## Note :
- First You Need To Create An Account Then You Will Be Redirected To Login Page , Plaese Use Your Username And Password Then You Will Redirected To Home Page

## Table of Contents

- Project Overview
- Approach and Flow
- Tech Stack
- Features
- Usage

### Project Overview


- This app displays a list of products categorized into different groups such as "audio", "gaming", "tv", and "mobile". It allows users to filter the products by category, and the products will be displayed accordingly. Users can also add items to their cart, and the cart count is stored and managed using localStorage.

The app checks for authentication, loads user data from localStorage, and presents a personalized greeting. Additionally, the product data is fetched either from an API or from localStorage if cached.

### Approach and Flow

#### LocalStorage for State Management

- Initially, I considered using Redux Toolkit for managing the state of the products and cart, as it’s a widely used state management solution. However, during the development of this project, I decided to opt for localStorage instead of Redux Toolkit due to concerns about its use being off-limits or inappropriate for this project.

I chose localStorage to store the products and cart data, allowing me to persist the data across page reloads and sessions. This decision was made based on the following:

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- LocalStorage is a simple solution: It allowed me to easily persist state without needing to set up a Redux store and middleware.
- Concerns about limitations: Since I wasn’t sure if Redux Toolkit was allowed for this project, I used localStorage as a safer alternative while still achieving the same goal of managing state across sessions.

- Despite not using Redux Toolkit in this project, I am well-versed with it and have used it in previous projects. I have experience in managing complex state with Redux Toolkit, including creating slices, reducers, and actions. However, for this app, I felt that localStorage provided a sufficient solution for state persistence.

### Data Flow

- User Authentication: When the app loads, it checks if the user is authenticated by looking at localStorage. If the user is not authenticated, they are redirected to the registration page.

- Fetching Products: The app fetches product data from an API on first load. The products are then cached in localStorage to avoid redundant API calls on subsequent visits.

-Category Filtering: The user can filter products by category, and the displayed products update accordingly. This is managed by state, and only the filtered products are displayed.

- Cart Management: The app tracks the number of items in the cart using localStorage. The cart count persists even when the page is refreshed.

### Tech Stack

- React: JavaScript library for building user interfaces.
- React Router: For routing and navigation.
- CSS: Used for styling the application.
- localStorage: For persisting data across sessions (products and cart).

### Features

- Product Filtering: Users can filter products by categories such as audio, gaming, tv, and mobile.
- Cart Tracking: The number of items in the cart is displayed and updated using localStorage.
- Authentication: The app checks for user authentication and redirects to the registration page if the user is not authenticated.
- Persistent Product Data: Product data is fetched from an API and cached in localStorage for faster subsequent loads.
- Responsive Design: The app is designed to be responsive for both desktop and mobile users.

### Usage

- Upon loading, the app will fetch products from an API and display them.
- Users can click the category buttons to filter products by category.
- The cart count is displayed, and users can update the cart as they add items.
- If a user is authenticated, their username is displayed in the header.
- The data (products and cart count) will persist even if the page is reloaded, thanks to localStorage.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
