"use strict";

// Funktion för att lägga till en ny sak att göra
function addItem() {
    let newTodoEl = document.getElementById("newtodo");
    let newTodo = newTodoEl.value;

    if (checkItemText(newTodo)) {
        let todoList = document.getElementById("todolist");
        let todoItem = document.createElement("article");
        todoItem.textContent = newTodo;
        todoItem.addEventListener("click", deleteItem);
        todoList.appendChild(todoItem);
        newTodoEl.value = "";
        displayMessage("");
    } else {
        displayMessage("Texten måste innehålla minst fem tecken.");
    }
}

// Funktion för att radera en sak att göra
function deleteItem() {
    let clickedItem = this;
    let todoList = document.getElementById("todolist");
    todoList.removeChild(clickedItem);
    updateStorage();
}

// Funktion för att kontrollera om inmatningstext innehåller minst fem eller fler tecken
function checkItemText(text) {
    return text.length >= 5;
}

// Funktion för inläsning/utskrift av lagrat data i web storage
function loadStorage() {
    let storedItems = localStorage.getItem("items");
    let todoList = document.getElementById("todolist");
    todoList.innerHTML = storedItems || "";

    // Lägg till event listeners för radering på laddning
    let todoItems = document.querySelectorAll("#todolist article");
    todoItems.forEach(item => {
        item.addEventListener("click", deleteItem);
    });
}

// Funktion för lagring av inmatning till web storage
function storeItem(item) {
    let storedItems = localStorage.getItem("items");
    if (!storedItems) {
        storedItems = "";
    }
    storedItems += "<article>" + item + "</article>";
    localStorage.setItem("items", storedItems);
}

// Funktion för uppdatering av lagrat data i web storage
function updateStorage() {
    let todoList = document.getElementById("todolist");
    localStorage.setItem("items", todoList.innerHTML);
}

// Funktion för rensning av lagrat data i web storage
function clearStorage() {
    localStorage.removeItem("items");
    let todoList = document.getElementById("todolist");
    todoList.innerHTML = "";
}

// Funktion för att visa meddelande
function displayMessage(message) {
    let messageElement = document.getElementById("message");
    messageElement.textContent = message;
}

// Lägg till händelsehanterare vid inladdning av sidan
window.onload = loadStorage;
document.getElementById("newtodobutton").addEventListener("click", addItem);
document.getElementById("clearbutton").addEventListener("click", clearStorage);
