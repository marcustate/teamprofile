const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamProfile = [];
const idArray = [];

function appMain() {
    console.log("Build your team");
    inquirer.prompt([
        //use if statement with answer !== "" when dealing with names
        //use RegEx for characters and numbers
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Enter at least one character.";
            }

        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a number greater than zero";
            }
        },

        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a vaild email address";
            }

        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a number greater than zero";
            }
        }
    ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.managerEmail, answers.managerId, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
}

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I do not want to add anymore team members"]
        }
    ])
        .then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already in use. Please select another ID.";
                    }
                    else {
                        return true;
                    }
                }
                return "Please enter a number greater than zero.";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "what is your engineer's email",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Pleaser enter a valid email address";
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "what is your engineer's Github username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ])
    .then(answers => {
        const engineer = new Engineer(
            answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub
        );
    })
    teamMembers.push(engineer);
    idArray.push(answers.engineerId);
    createTeam();
}

