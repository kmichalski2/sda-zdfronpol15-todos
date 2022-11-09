import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initAddTaskForm } from "./add";
import { firebaseConfig } from "./config";
import { renderTaskList } from "./list";
import { initEditTaskForm } from "./edit";
import { initRegisterForm } from "./register";
import {
  displayUserName,
  initLoginForm,
  initSignOut,
  initSignWithGoogle,
} from "./login";
import { displayAlert } from "./alert";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./node_modules/bootstrap/dist/js/bootstrap";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const tasksCollection = collection(database, "tasks");
const auth = getAuth(app);
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    renderTaskList(tasksCollection, database, user.uid, storage);
    initAddTaskForm(tasksCollection, user.uid, storage);
    initEditTaskForm(database, storage);
    displayUserName(user.email);
  } else {
    const whitelist = ["/login.html", "/register.html"];

    if (!whitelist.includes(window.location.pathname)) {
      window.location.href = window.location.origin + "/login.html";
    }
  }
});

initRegisterForm(auth);
initLoginForm(auth);
initSignWithGoogle(auth);
initSignOut(auth);
