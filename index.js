import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { initAddTaskForm } from "./add";
import { firebaseConfig } from "./config";
import { initTaskList } from "./list";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const tasksCollection = collection(database, "tasks");

const initEditTaskForm = (database) => {
  const editTaskForm = document.querySelector("#editTaskForm");

  if (editTaskForm) {
    editTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(editTaskForm);

      const deadline = formData.get("deadline");
      const deadlineDate = new Date(deadline);
      const deadlineTimestamp = Timestamp.fromDate(deadlineDate);

      const docRef = doc(database, "tasks", formData.get("id"));

      updateDoc(docRef, {
        title: formData.get("title"),
        deadline: deadlineTimestamp,
      }).then((result) => {
        console.log("Zaktualizowano zadanie");
      });
    });
  }
};

initTaskList(tasksCollection, database);
console.log("Wykonano initTaskList");
initAddTaskForm(tasksCollection);
console.log("Wykonano initAddTaskForm");
initEditTaskForm(database);
