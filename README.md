## Pokedex

A simple application used to search and view pokemon information, built with React, TailwindCSS, and Cypress for E2E testing. [Live Demo](https://poke-dex-blond.vercel.app/)

## Screenshots

#### Desktop

![Desktop Pokemon Info](public/readme-media/desktop.gif)

#### Mobile

<div style="display:flex; flex-direction:row; justify-content:center;">
<img align="left" src="public/readme-media/mobile-pokemon-info.gif" width="50%"/>
<img align="right" src="public/readme-media/search-pokemon.gif" width="50%"/>
</div>
<br>

## Installation and Setup Instructions

Clone down this repository. You will need `node`, `cypress` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm run cypress:open`

To Start Server:

`npm run dev`

To Visit App:

`localhost:5173/`

## Features

- Responsive
- Search Pokemon by name
- View 898 Pokemon information

## Steps taken to increase performance

- Lazy loading
    - pokemon images to increase page load speed
    - components with suspend
- Dispose of three.js objects
- Clean Up Event Listeners

## To do

- Test in several browsers
- E2E testing

## License

[MIT](LICENSE) Copyright (c) 2023 Kris Collins
