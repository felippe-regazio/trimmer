# Trimmer

Simple "Pure Client" Video Trimmer by Felippe Regazio  
Demo at: https://felippe-regazio.github.io/trimmer/#/

# Know More

This implements a JS Web Worker is a ffmpeg.js (Emscripten Port) and a React App to cut and slice videos without a backend, directly on the client. The React (Front End) comunicates with the Web Worker - which is used to execute the hard processing on asynchronously on background - The Web Woker process the video files using the ffmpeg.js without freeze the page, collect the results, parse it and send again the React App. The stack is pretty simple: Emscripten, Vanilla JS, React + TS.

# MVP Warn

Despite being stable, this is an MVP. This is not a "Production Ready App". I made it in two weeks as an experiment, and since i didnt wrote all the tests yet, id suggest you to dont use it for any production purpose unless you do the proper tests: device variation, file variation, stress tests, security tests and unity tests.

# Development

- First of all: `npm install`
- Development: `npm run start`
- Build with: `npm run build`
- Deploy on your GH-Pages: fork this repo and run `./deploy.sh`.
