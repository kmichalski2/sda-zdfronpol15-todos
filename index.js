import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { initAddTaskForm } from "./add";
import { firebaseConfig } from "./config";
import { renderTaskList } from "./list";
import { initEditTaskForm } from "./edit";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./node_modules/bootstrap/dist/js/bootstrap";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const tasksCollection = collection(database, "tasks");

renderTaskList(tasksCollection, database);
initAddTaskForm(tasksCollection);
initEditTaskForm(database);
