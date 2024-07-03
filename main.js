#!/usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
import { renderTime } from './digitalOutput.js';
const userInput = await inquirer.prompt([{
        name: "hours",
        type: "number",
        message: "Please enter the amount of hours:",
        validate: (input) => {
            if (isNaN(input)) {
                return "\nPlease Enter Valid Number Of Hours\n";
            }
            else {
                return true;
            }
        }
    },
    {
        name: "minutes",
        type: "number",
        message: "Please enter the amount of minutes:",
        validate: (input) => {
            if (isNaN(input)) {
                return "\nPlease Enter Valid Number Of Minutes\n";
            }
            else {
                return true;
            }
        }
    },
    {
        name: "seconds",
        type: "number",
        message: "Please enter the amount of seconds:",
        validate: (input) => {
            if (isNaN(input)) {
                return "\nPlease Enter Valid Number Of Seconds\n";
            }
            else {
                return true;
            }
        }
    }
]);
async function countdownTimer(hours, minutes, seconds) {
    const totaltime = (hours * 3600) + (minutes * 60) + seconds;
    const initialTime = new Date().setSeconds(new Date().getSeconds() + totaltime);
    const time = new Date(initialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(time, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.cyan.bold(`\n<< Countdown Finished >>\n`));
            console.log(chalk.cyan.bold(`\n\n<-------------------------------------------------------------------------------------------------->\n\n`));
            process.exit();
        }
        const hr = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const min = Math.floor((timeDiff % 3600) / 60);
        const sec = Math.floor(timeDiff % 60);
        //console.log(`${hr.toString().padStart(2, "0")}h : ${min.toString().padStart(2, "0")}m : ${sec.toString().padStart(2, "0")}s`);
        renderTime(hr, min, sec);
    }), 1000);
}
countdownTimer(userInput.hours, userInput.minutes, userInput.seconds);
