
# MusicBase

This is a frontend application with CRUD that displays a table of albums fetched from a mock data source.
 
Data is fetched from https://jsonplaceholder.typicode.com/albums and
https://jsonplaceholder.typicode.com/albums/1/photos.

Any modifications made (Create, Update, Delete) are maintained in localStorage, to get a fresh start, delete localStorage data.

## Features

- Responsive Tables
- Create, Read, Update and Delete new records
- Automatic Loading
- Automatic Sorting

## Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6dee3bd-983b-4a6f-9533-68dbdb8e3319/deploy-status)](https://app.netlify.com/sites/dynamic-kashata-1be19c/deploys)

https://dynamic-kashata-1be19c.netlify.app/

Please use a local server for better experience.

## Deployment

You can use vite to run a dev server, by
```bash
npm run dev
```

You can use the npm package `live-server` or the **Live Server** VSCode extension to view this project in your local computer.

To deploy to production, use
```bash
npm run build
```

## Lessons Learned

While builing this vanila HTML, CSS, JS project, I was able to discover some of the new features supported by the browser APIs. This gave me a chance to learn more about these features and how they can be useful to various usecases.

Some of the lessons I learnt include:

- Setting Up Intersection Observers to automatically load more entries onto table
- Mutation Observers to toggle the autoloading features.
- Creating and firing custom events across the application for specific purposes (here to rebuild the table, and surgically update the dom)
- Web Components. Great feature to increase the reusability of components, and provide a seperation of code.
- How events bubble and how to capture them at specific instances.

