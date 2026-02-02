"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import readline from "readline";
var readline = require("readline");
var fs = require("fs");
var path = require("path");
var FILE_PATH = path.join(__dirname, "todos.json");
var todos = [];
// create readline interface
var rl = readline.createInterface({
    input: process.stdin, // Listens to what we type
    output: process.stdout, // Shows messages on the screen
});
// (C)create a new todo
var addTodo = function () {
    rl.question("Enter Todo: ", function (text) {
        if (text.trim() === "") {
            console.log("Todo can not be empty!\n");
        }
        else {
            rl.question("Set priority (high/medium/low): ", function (priorityInput) {
                var priority = priorityInput.toLowerCase();
                if (!["high", "medium", "low"].includes(priority)) {
                    console.log("invalid priority! Defaulting to 'medium'");
                }
                var newTodo = {
                    id: Date.now(),
                    text: text.trim(),
                    date: Date.now(),
                    priority: ["high", "medium", "low"].includes(priority) ? priority : "medium",
                };
                todos.push(newTodo);
                saveTodos();
                console.log("Todo is added successfully!");
                showMenu();
            });
        }
    });
};
//(Read) all todos
var readTodos = function () {
    if (todos.length === 0) {
        console.log("You have no todos!");
    }
    else {
        console.log("You have the following todos \n");
        console.log("Total number of TODO: ".concat(todos.length, " \n"));
        todos.forEach(function (todo) {
            console.log("".concat(todo.id, " - ").concat(todo.text, " - ").concat(todo.priority, " - ").concat(new Date(todo.date).toLocaleDateString()));
        });
    }
    showMenu();
};
//(U)pdate a todo
var updateTodo = function () {
    rl.question("Enter the ID of the todo to update: ", function (input) {
        var id = parseInt(input);
        var todo = todos.find(function (t) { return t.id === id; });
        if (!todo) {
            console.log("Todo not found!");
            showMenu();
            return;
        }
        rl.question("Enter new text (leave blank to keep current): ", function (newText) {
            rl.question("Enter new priority (high/medium/low, leave blank to keep current): ", function (newPriority) {
                if (newText.trim() !== "")
                    todo.text = newText.trim();
                if (["high", "medium", "low"].includes(newPriority.toLowerCase())) {
                    todo.priority = newPriority.toLowerCase();
                }
                console.log("Todo updated successfully!");
                saveTodos();
                showMenu();
            });
        });
    });
};
// (D) elete a todo
var deleteTodo = function () {
    rl.question("Which todo would you like to delete :", function (input) {
        var id = parseInt(input);
        var updatedTodos = todos.filter(function (todo) { return todo.id !== id; });
        if (updatedTodos.length === todos.length) {
            console.log("Task not found");
        }
        else {
            todos = updatedTodos;
            console.log("Todo removed successfully!");
            saveTodos();
        }
        showMenu();
    });
};
// Clear all todos
var clearTodos = function () {
    todos = [];
    saveTodos();
    console.log("All todos cleared!");
    showMenu();
};
// Handle command logic
var handleCommand = function (command) {
    switch (command.trim().toLowerCase()) {
        case "add":
            addTodo();
            break;
        case "read":
            readTodos();
            break;
        case "update":
            updateTodo();
            break;
        case "remove":
            deleteTodo();
            break;
        case "clear todo":
            clearTodos();
            break;
        case "exit":
            console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Unknow command \n");
            showMenu();
    }
};
// Show the menu on startup
// Show menu and handle commands
var showMenu = function () {
    //   console.clear();
    console.log("\n=== Todo List App ===");
    console.log("Commands: add, read, update, remove, clear todo, exit\n");
    process.stdout.write("> ");
    rl.question("", function (command) {
        handleCommand(command);
    });
};
var saveTodos = function () {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos));
};
var loadTodos = function () {
    if (fs.existsSync(FILE_PATH)) {
        todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    }
};
// Start the app
// console.log("\n=== Todo List App ===");
// console.log("Commands: add, list, remove, clear todo, exit\n");
loadTodos();
showMenu();
