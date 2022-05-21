// Implement the `Main` class here
class Main {
  

  init() {
    //Selectors
    const todoInput = document.getElementById("input-txt");
    const todoButton = document.getElementById("add-btn");
    const todoList = document.getElementById("list-element");
    const clearAllBtn = document.getElementById("clearAll-btn");
    const sortBtn = document.getElementById("sort-btn");
    const inputBox = document.querySelector(".inputField input");
    const svgContainer = document.getElementById("svg");
    const todoElement = document.getElementById("list-element");
    const footerSpan = document.querySelector(" .footer span ");

    const animItem = bodymovin.loadAnimation({
        wrapper: svgContainer,
        animType: "svg",
        loop: false,
        autoplay: false,
        path: "https://assets4.lottiefiles.com/private_files/lf30_5aubt2fy.json",
      });
      
      const pendingTasksCount = document.querySelector(".pendingTasksCount");
      const ENTER_KEY = 13;
      const TRASH_ANIMATION_TIMEOUT = 500;

      
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
