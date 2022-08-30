/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("let sheet = 1;\r\nconst formerBtn = document.getElementById('former-btn');\r\nconst nextBtn = document.getElementById('next-btn');\r\n\r\nnextBtn.addEventListener('click', () => {\r\n  if(sheet < 1000) {\r\n    sheet += 1;\r\n    loadMovies(sheet);\r\n  }\r\n});\r\n\r\nconst loadMovies = async() => {\r\n  try {\r\n    const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=346a39160688fd6b7c615712dce07126&page=${sheet}`);\r\n    \r\n    if(response.status === 200) {\r\n      const information = await response.json();\r\n\r\n      let movies = '';\r\n      information.results.forEach(movie => {\r\n        movies += `\r\n          <div class='movie'>\r\n            <img class='image-movie' src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' alt='${movie.title}'>\r\n            <h2 class'movie-title'>${movie.title}</h2>\r\n            <p>${movie.overview}</p>\r\n          </div>\r\n        `;\r\n      });\r\n    } else if (response.status === 401) {\r\n      console.log('You put the wrong key');\r\n    } else if (response.status === 404) {\r\n      console.log('The movie you are looking for is not found');\r\n    } else {\r\n      console.log('Something went wrong');\r\n    }\r\n  } catch (error) {\r\n    console.log(error);\r\n  }\r\n}\r\n\r\nloadMovies();\r\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;