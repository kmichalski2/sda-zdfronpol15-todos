import { doc, getDocs, updateDoc } from "firebase/firestore";

export const initTaskList = (tasksCollection, db) => {
  if (!tasksCollection) {
    throw new Error("Parametr tasksCollection nie został podany");
  }

  const tasksList = document.querySelector("#tasksList");

  if (tasksList) {
    getDocs(tasksCollection).then((result) => {
      result.docs.forEach((doc) => {
        const task = doc.data();
        const taskId = doc.id;

        const date = task.deadline.toDate();
        const formattedDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();

        // yyyy-MM-dd
        const inputDateFormat =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();

        const doneButton = `<button class="btn btn-success" data-done="${taskId}">Done</button>`;
        const editButton = `<button class="btn btn-primary" data-edit="${taskId}" data-deadline="${inputDateFormat}" data-title="${task.title}">Edit</button>`;
        const li = `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${task.title} - ${formattedDate}</span> <div>${doneButton} ${editButton}</div></li>`;

        tasksList.innerHTML += li;
      });

      handleDoneButtons(db);
      handleEditButtons();
    });
  }
};

const handleEditButtons = () => {
  const buttons = document.querySelectorAll("[data-edit]");
  const editTaskForm = document.querySelector("#editTaskForm");
  const titleInput = editTaskForm.querySelector("[name='title']");
  const deadlineInput = editTaskForm.querySelector("[name='deadline']");
  const idInput = editTaskForm.querySelector("[name='id']");

  buttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const element = event.target;

      deadlineInput.value = element.dataset.deadline;
      titleInput.value = element.dataset.title;
      idInput.value = element.dataset.edit;
    })
  );
};

const handleDoneButtons = (db) => {
  const buttons = document.querySelectorAll("[data-done]");

  buttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const element = event.target;
      const taskId = element.dataset.done;

      const docRef = doc(db, "tasks", taskId);

      updateDoc(docRef, {
        done: true,
      }).then((result) => {
        console.log("Zadanie zostało wykonane");
      });
    })
  );
};

// 4. Nastepnie dodaj obsluge wysylki formularza ktory zaktualizuje konkretne zadanie.
