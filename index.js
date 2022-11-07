import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initAddTaskForm } from "./add";
import { firebaseConfig } from "./config";
import { renderTaskList } from "./list";
import { initEditTaskForm } from "./edit";
import { initRegisterForm } from "./register";
import { initLoginForm, initSignOut } from "./login";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./node_modules/bootstrap/dist/js/bootstrap";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const tasksCollection = collection(database, "tasks");
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    renderTaskList(tasksCollection, database);
    initAddTaskForm(tasksCollection);
    initEditTaskForm(database);
  } else {
    if (
      window.location.pathname !== "/login.html" &&
      window.location.pathname !== "/register.html"
    ) {
      window.location.href = window.location.origin + "/login.html";
    }
  }
});

initRegisterForm(auth);
initLoginForm(auth);
initSignOut(auth);
