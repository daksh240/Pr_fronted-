function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === "") {
        alert("Please enter a habit!");
        return;
    }

    // Create a new list item for the habit
    const li = document.createElement("li");

    // Habit name
    const span = document.createElement("span");
    span.textContent = habitName;
    li.appendChild(span);

    // Progress input
    const progressDiv = document.createElement("div");
    progressDiv.classList.add("habit-progress");

    const progressInput = document.createElement("input");
    progressInput.type = "number";
    progressInput.min = "0";
    progressInput.max = "30"; // Assuming habit is tracked for 30 days in a month
    progressInput.value = "0";
    progressInput.addEventListener("input", () => updateProgress(progressInput, habitName));
    progressDiv.appendChild(progressInput);
    progressDiv.appendChild(document.createTextNode(" out of 30 days"));

    li.appendChild(progressDiv);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => li.remove();
    li.appendChild(deleteButton);

    // Append the habit to the habit list
    habitList.appendChild(li);

    // Clear input field
    habitInput.value = "";
}

// Function to update the progress
function updateProgress(input, habitName) {
    const progress = input.value;
    console.log(`Progress for habit "${habitName}" is ${progress}/30 days.`);
}