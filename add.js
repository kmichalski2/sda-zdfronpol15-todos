import { Timestamp, addDoc } from "firebase/firestore";

export const initAddTaskForm = (tasksCollection) => {
  const addTaskForm = document.querySelector("#addTaskForm");

  if (addTaskForm) {
    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(addTaskForm);

      const deadlineDate = new Date(formData.get("deadline"));
      const deadlineTimestamp = Timestamp.fromDate(deadlineDate);

      addDoc(tasksCollection, {
        title: formData.get("title"),
        deadline: deadlineTimestamp,
        done: false,
        order: +formData.get("order"),
      }).then((result) => {
        console.log("Zadanie zostało dodane do firestore");
        console.log(result);
      });
    });
  }
};
