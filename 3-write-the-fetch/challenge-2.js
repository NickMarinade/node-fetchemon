// require dependencies
const fs = require('fs');
const path = require('path');
const nodeFetch = require('node-fetch');
const assert = require('assert');

// declare constants
const START = Date.now();
const REPORT_FILE = __dirname + '/' + path.basename(__filename).replace('.js', '-report.txt');

// define logging function
const log = (msg) => {
  const now = `${Date.now() - START} ms: `;
  console.log(now + msg);
  if (typeof msg === 'string') {
    const cleanedString = msg
      // remove special characters used to print assertion colors in terminal
      .replace(/\[31m|\[32m|\[39m/g, '')
      // remove the file path from error messages for privacy and readability
      .replace(new RegExp(__dirname, "g"), ' [ ... ] ');
    fs.appendFileSync(REPORT_FILE, now + cleanedString + '\n');
  } else {
    const stringifiedMsg = JSON.stringify(msg);
    fs.appendFileSync(REPORT_FILE, now + stringifiedMsg + '\n');
  };
};

// log when a user forces the script to exit
process.on('SIGINT', function onSIGINT() {
  log('Ctrl-C');
  process.exit(2);
});

// log uncaught errors
const handleError = (err) => {
  log(err);
  process.exit(1);
};
process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

// (re)initialize report file
fs.writeFileSync(REPORT_FILE, '');
log((new Date()).toLocaleString());


// --- begin main script ---

// the pokemon with 71 moves and the abilities "hustle", "rivalry", "poison-point"




