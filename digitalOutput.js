#!/usr/bin/env node
import chalk from 'chalk';
import ansiEscapes from 'ansi-escapes';
// ASCII art for digits 0-9 in digital clock style
export const digits = {
    "0": [
        " _ ",
        "| |",
        "|_|"
    ],
    "1": [
        "   ",
        "  |",
        "  |"
    ],
    "2": [
        " _ ",
        " _|",
        "|_ "
    ],
    "3": [
        " _ ",
        " _|",
        " _|"
    ],
    "4": [
        "   ",
        "|_|",
        "  |"
    ],
    "5": [
        " _ ",
        "|_ ",
        " _|"
    ],
    "6": [
        " _ ",
        "|_ ",
        "|_|"
    ],
    "7": [
        " _ ",
        "  |",
        "  |"
    ],
    "8": [
        " _ ",
        "|_|",
        "|_|"
    ],
    "9": [
        " _ ",
        "|_|",
        " _|"
    ]
};
// ASCII art for colon
export const colon = [
    "   ",
    " . ",
    " . "
];
// Function to render each digit in the digital clock style
export function renderDigit(digit, index) {
    const lines = digits[digit];
    for (let i = 0; i < lines.length; i++) {
        process.stdout.write(`${ansiEscapes.cursorTo(index * 4, i)}${chalk.cyan.bold(lines[i])}`);
    }
}
// Function to render the time in HH:MM:SS format using ASCII art
export function renderTime(hours, minutes, seconds) {
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    process.stdout.write(ansiEscapes.clearScreen); // Clear the console
    for (let i = 0; i < 3; i++) { // Three lines for each digit
        let line = '';
        for (let j = 0; j < timeStr.length; j++) {
            if (timeStr[j] === ':') {
                line += `${chalk.cyan.bold(colon[i])} `;
            }
            else {
                line += `${chalk.cyan.bold(digits[timeStr[j]][i])} `;
            }
        }
        process.stdout.write(`${line}\n`);
    }
}
