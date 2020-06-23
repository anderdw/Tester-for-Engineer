const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./lib/htmlRenderer");

const team = [];

function appMenu () {
    console.log("Let's build a team.");
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter your name.",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your employee ID #.",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email.",
                name: "email"
            },
            {
                type: "input",
                message: "Enter your Office Number",
                name: "officeNumber"
            },
        ])
        .then(res => {
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
            team.push(manager);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Do you want to build an Engineer, Intern, or are you ready to build your team template?',
                name: 'memberChoice',
                choices: ['Engineer', 'Intern', 'Build Your Team Template']
            }
        ])
        .then(res => {
            switch (res.memberChoice) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                case 'Build Your Team Template':
                    buildTeam();
            }
        })
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the Engineer's Name.",
                name: "name"
            },
            {
                type: "input",
                message: "Enter the Engineer's employee ID #.",
                name: "id"
            },
            {
                type: "input",
                message: "Enter the Engineer's Email.",
                name: "email"
            },
            {
                type: "input",
                message: "Enter the Engineer's GitHub Username.",
                name: "github"
            },
        ])
        .then(res => {
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            team.push(engineer);
            createTeam();
        })
    }
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the Intern's First & Last Name.",
                name: "name"
            },
            {
                type: "input",
                message: "Enter the Intern's Employee ID #.",
                name: "id"
            },
            {
                type: "input",
                message: "Enter the Intern's Email Address.",
                name: "email"
            },
            {
                type: "input",
                message: "Enter the Intern's School.",
                name: "school"
            },
        ])
        .then(res => {
            const intern = new Intern(res.name, res.id, res.email, res.school);
            team.push(intern);
            createTeam();
        })
    }
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(team), 'utf-8');
    }
    createManager();
}
appMenu();
