
# Traxx (discographic)(client)
Traxx is a discographic music searching and album collection client application.
Users can search from a database containing over 10M records from over 5M
artists. It is a single page application (SPA) built with ReactJS that interfaces
with an ExpressJS backend API using axios.
https://mdipietr0.github.io/traxx-client/

Link to the API:


## Technologies Used:

- ReactJS (w/ JSX, React Router, )
- Axios (HTTP library)
- Discogs third-party API
- Font Awesome (react-fontawesome package)
- HTML/CSS
- Bootstrap 4
- JavaScript
- Git

## Planning and Development process:

Traxx provides a way to search for records and maintain collections as well as
wishlists. This project was driven by a desire to create a product that would
provide vinyl collectors with a simple and elegant experience. As such, the
planning for this application started with the UX/UI.

Users will spend the greatest amount of time with this app searching and then
viewing and interacting with the results so that is where we started. This will
be split between two views. On the landing page the user will have a single
search bar to search for results. The design for the results page will be a
simple grid displaying the cover art of each result in a simple but colorful
collage.

The resources necessary for this app are items belonging to 'Wishlist' and
'Collection'. Both of these resources will contain an id to the record in the
database which will be used to request the related record from the API. It was
decided that the benefits of using only one language for both the client and
server outweighed the other factors. An ExpressJS app was built on Node using
mongoDB to keep the resources.


// Outline React File structure based on resources REST

// More about planning and process

![Wireframe1](https://i.imgur.com/7o02CGE.png)
![Wireframe2](https://i.imgur.com/AwISyEt.png)

## User Stories:
  - A user will be able to register an account
    - Upon success the user will also be signed in
    - Upon failure the user will be shown an error message
  - A user will be able to log in to their account
    - Upon success the user will be shown the main menu screen
    - Upon failure the user will be shown an error message
  - A user will be able to log out out their account
    - Upon success the user will be signed out and returned to the landing page
    - Upon failure the user will be shown an error message
  - A user will be able to change their password
    - Upon success the user will be shown a success message
    - Upon failure the user will be shown an error message
  - A user will be able to search a database for records
  - A user will be able to view search results
  - A user will be able to add record to their wishlist
  - A user will be able to add record to their collection
  - A user will be able to view the records in their wishlist
  - A user will be able to view the records in their collection
  - ***** NOT NEEDED ***** A user will be able to update their wishlist
  - ***** NOT NEEDED ***** A user will be able to update their collection
  - A user will be able to delete a record from their wishlist
  - A user will be able to delete a reecord from their collection

## Version 2 (Currently developing):
