const buttons = document.querySelectorAll("button");
const input = document.querySelector(".display-input");

Array.from(buttons).forEach((button) => {
  console.log(button.textContent);
  button.addEventListener("click", () => {
    if (button.classList.contains("all-clear")) {
      input.value = "";
    } else if (button.classList.contains("clear")) {
      input.value = input.value.slice(0, -1);
    } else if (button.classList.contains("equal")) {
      try {
        input.value = eval(input.value);
      } catch (e) {
        input.value = "Error";
      }
    } else {
      input.value += button.textContent;
    }
  });
});
