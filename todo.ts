// import readline from "readline";
import * as readline from "readline";


type Priority = "high" | "medium" | "low";
// store todo in array
type Todo = {
    id: number;
    text: string;
    date: number;
    priority: Priority;
};

let todos: Todo [] = [];
// create readline interface

const rl = readline.createInterface({
    input: process.stdin, // Listens to what we type
    output: process.stdout, // Shows messages on the screen
});
// (C)create a new todo

const addTodo = (): void => {
    rl.question("Enter Todo: ", (text: string) => {
        if(text.trim() === ""){
         console.log("Todo can not be empty!\n");
    
        } else {

            rl.question(
                "Set priority (high/medium/low): ", (priorityInput: string) =>{
                const priority = priorityInput.toLowerCase() as Priority;
                if(!["high", "medium", "low"].includes(priority)){
                    console.log("invalid priority! Defaulting to 'medium'");
                }
            


            const newTodo: Todo = {
                id: Date.now(),
                text: text.trim(),
                date: Date.now(),
                priority: ["high", "medium", "low"].includes(priority) ? priority : "medium",
            };
            todos.push(newTodo);
            console.log(`Todo is added successfully!`);
              showMenu();
            }
        );
    }
    });
};


//(Read) all todos
const readTodos = (): void => {
    if(todos.length === 0){
    console.log("You have no todos!");

} else {
    console.log(`You have the following todos : ${todos.length} \n`);
    todos.forEach((todo: Todo) => {
        console.log(`${todo.id} - ${todo.text} - ${todo.priority} - ${new Date(todo.date).toLocaleDateString()}`);
    });
    }
    showMenu();
};
//(U)pdate a todo


// (D) elete a todo

const deleteTodo = () => {
    rl.question("Which todo would you like to delete", (input: string)=>{
        const id: number = parseInt(input);

        const updatedTodos: Todo [] = todos.filter((todo: Todo) => todo.id !== id);

        if(updatedTodos.length === todos.length){
            console.log("Task not found");
        } else {
            todos = updatedTodos;
            console.log("Todo removed successfully!");
        }
        showMenu();
    });
};


// Clear all todos
const clearTodos = (): void =>{
    todos = [];
    console.log("All todos cleared!");
    showMenu();
}

// Handle command logic

const handleCommand = (command: string) : void => {
    switch (command.trim().toLowerCase()){
        case "add":
            addTodo();
        break;
        case "read": 
            readTodos();
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
const showMenu = (): void => {
//   console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, read, remove, clear todo, exit\n");
  process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });
};

// Start the app
console.log("\n=== Todo List App ===");
console.log("Commands: add, list, remove, clear todo, exit\n");
showMenu();