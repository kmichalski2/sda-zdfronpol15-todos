import {
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export const renderTaskList = (tasksCollection, db, userId) => {
  if (!tasksCollection) {
    throw new Error("Parametr tasksCollection nie został podany");
  }

  const tasksList = document.querySelector("#tasksList");

  if (tasksList) {
    // const tasksQuery = query(tasksCollection, orderBy("order"));
    const tasksByUserId = query(tasksCollection, where("userId", "==", userId));

    getDocs(tasksByUserId).then((result) => {
      tasksList.innerHTML = "";

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

        const attachmentButton = task.attachment
          ? `<a class="btn btn-info" href="${task.attachment}">File</a>`
          : ``;
        const doneButton = `<button class="btn btn-success" data-done="${taskId}">Done</button>`;
        const editButton = `<button class="btn btn-primary" data-edit="${taskId}" data-deadline="${inputDateFormat}" data-title="${task.title}" data-order="${task.order}">Edit</button>`;
        const deleteButton = `<button class="btn btn-danger" data-delete="${taskId}">Delete</button>`;
        const li = `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${task.title} - ${formattedDate}</span> <div>${attachmentButton} ${doneButton} ${editButton} ${deleteButton}</div></li>`;

        tasksList.innerHTML += li;
      });

      handleDoneButtons(db);
      handleEditButtons();
      handleDeleteButtons(db);
    });
  }
};

const handleEditButtons = () => {
  const buttons = document.querySelectorAll("[data-edit]");
  const editTaskForm = document.querySelector("#editTaskForm");
  const titleInput = editTaskForm.querySelector("[name='title']");
  const deadlineInput = editTaskForm.querySelector("[name='deadline']");
  const orderInput = editTaskForm.querySelector("[name='order']");
  const idInput = editTaskForm.querySelector("[name='id']");

  buttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const modalRef = new bootstrap.Modal("#editTaskModal");
      const element = event.target;

      modalRef.show();

      deadlineInput.value = element.dataset.deadline;
      titleInput.value = element.dataset.title;
      idInput.value = element.dataset.edit;
      orderInput.value = element.dataset.order;
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

const handleDeleteButtons = (db) => {
  const buttons = document.querySelectorAll("[data-delete]");

  buttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const element = event.target;
      const taskId = element.dataset.delete;

      const docRef = doc(db, "tasks", taskId);

      deleteDoc(docRef).then((result) => {
        element.parentNode.parentNode.remove();
      });
    })
  );
};
