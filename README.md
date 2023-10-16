# Angle

This site is a complete ripoff of [Angle.wtf](https://angle.wtf) - a game where you have a limited number of chances to guess the angle shown.

The official site has a new angle every day and only allows you to play once a day, storing your game data so you can view trends over time.

I wanted to keep playing, so I made a clone of the site using React. My version allows for 5 attempts at guessing the angle and provides an option to refresh the game with a new angle.

I used this as an opportunity to learn more about dynamically writing SVG paths. The angle SVG is generated using two straight lines, a small circle at the "origin", and a medium-sized arc that connects the two lines (representing the angle). At render-time (and whenever a new game begins), there's a random rotation applied to the SVG group in order to make it a little more difficult.

The main tools I used for this project are Vite and React, with Github Pages as a deployment pipeline.

The live game can be found at: [https://tylertierney.github.io/angle/](https://tylertierney.github.io/angle/)
