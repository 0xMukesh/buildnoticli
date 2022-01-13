#! /usr/bin/env node

import inquirer from 'inquirer'
import shell from 'shelljs'
import chalk from 'chalk'
import notifier from 'node-notifier'
import path from 'path'

import questions from './utils/questions.js'

const __dirname = path.resolve(path.dirname(''));

inquirer.prompt(questions).then((answers) => {
    const commandArray = answers.command.split(',')
    commandArray.map((command) => {
        const runningCommand = shell.exec(command)
        if (runningCommand.code !== 0) {
            console.log(chalk.red(chalk.bold("ERROR!")), `The ${chalk.bold(command)} command had an error while executing`)
        }
        else {
            console.log(chalk.green(chalk.bold("SUCCESS!"), `The ${chalk.bold(command)} command had been successfully completed`))
        }
    })
    notifier.notify({
        title: `${answers.message}`,
        message: 'Hey dev 👋, I have completed running the build task. Please have a look 😄',
        icon: path.join(__dirname, 'images/assets/icon.png')
    });
})