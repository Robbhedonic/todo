"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import readline from "readline";
var readline = require("readline");
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
            var newTodo = {
                id: Date.now(),
                text: text.trim(),
                date: Date.now(),
            };
            todos.push(newTodo);
            // const dateCreated = new Date(newTodo.date).toLocaleDateString();
            console.log("Todo is added successfully!");
        }
        showMenu();
    });
};
//(Read) all todos
var readTodos = function () {
    if (todos.length === 0) {
        console.log("You have no todos!");
    }
    else {
        console.log("You have the following todos: \n");
        todos.forEach(function (todo) {
            console.log("".concat(todo.id, " - ").concat(todo.text, " - ").concat(new Date(todo.date).toLocaleDateString()));
        });
    }
    showMenu();
};
//(U)pdate a todo
// (D) elete a todo
var deleteTodo = function () {
    rl.question("Which todo would you like to delete", function (input) {
        var id = parseInt(input);
        var updatedTodos = todos.filter(function (todo) { return todo.id !== id; });
        if (updatedTodos.length === todos.length) {
            console.log("Task not found");
        }
        else {
            todos = updatedTodos;
            console.log("Todo removed successfully!");
        }
        showMenu();
    });
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
        case "remove":
            deleteTodo();
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
    console.log("Commands: add, read, remove, exit\n");
    process.stdout.write("> ");
    rl.question("", function (command) {
        handleCommand(command);
    });
};
// Start the app
console.log("\n=== Todo List App ===");
console.log("Commands: add, list, remove, exit\n");
showMenu();
