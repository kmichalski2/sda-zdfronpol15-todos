import { updateDoc, Timestamp, doc, collection } from "firebase/firestore";
import { renderTaskList } from "./list";

export const initEditTaskForm = (database) => {
  const editTaskForm = document.querySelector("#editTaskForm");
  const tasksCollection = collection(database, "tasks");

  if (editTaskForm) {
    editTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(editTaskForm);

      const deadline = formData.get("deadline");
      const deadlineDate = new Date(deadline);
      const deadlineTimestamp = Timestamp.fromDate(deadlineDate);

      const docRef = doc(database, "tasks", formData.get("id"));
      const modalRef = new bootstrap.Modal("#editTaskModal");

      updateDoc(docRef, {
        title: formData.get("title"),
        deadline: deadlineTimestamp,
        order: +formData.get("order"),
      }).then((result) => {
        console.log("Zaktualizowano zadanie");

        modalRef.hide();

        renderTaskList(tasksCollection, database);
      });
    });
  }
};
