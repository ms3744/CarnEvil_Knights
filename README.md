# CarnEvil_Knights
F28WP_2019 Course work 

CarnEvil knights is an adventure game where the hero (The Knight) fights the invaded ghosts. As the hero progresses, they must jump over obstacles, the graves and slash the incoming enemies. The scores will be scored in a database, which is kept in the server side along with the player ID. The client side will display the scores as a multiplayer game. 

# Group Members
Megha Sharma, Nikita Singh, Fathima Saaraah Sinnalebbe, Lakshmi Sivadas, Prithyuksha Viswanathan

# Instructions
Enter user details
Once entered the game - use SPACE KEY to jump over graves
Once entered the game - user RIGHT KEY to slash the ghosts (The ghosts will only be slashed if they are close enough)

The repository has two main sides, the client and server. The client side is stored in the client folder

# Client
This stores the files relating to the information and code that deals with the users, it contains the front end HTML CSS and JS files as well as the assets (Stored in the assets folder) that have been used

## Assets
This folder contains any assets (images, sound files etc) used in the game, for their reference, please refer to the style.css file

## Index.html
This is first page on load and contains the form that will take the user details. 
On verification of the user the page jumps to the main game web page

## mainIndex.js
This is the client side JS file that supports the index.html, it will send a cookie of the username and password to the game so they can use it 

## gamebegin.html
This is the game HTML that stores the game elements and what the player interacts with

## game.js
This is the client side JS file that supports the gamebegin.html, it contains the game engine and all interactivity of the game takes place through this file

## style.css
This is the single style sheet used for the game 

# app.js
This is the server side JS file attached to the game, it creates and connects to the data base as well as maintains connection with the client side using express and socket.io, it is written using NodeJS and a data base is created using mySQL

# package.json / package-lock.json / node-modules.zip
Dependancies
