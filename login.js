import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import { displayAlert } from "./alert";

export const initLoginForm = (auth) => {
  const loginForm = document.querySelector("#loginForm");
  let wrongAttemps = 0;

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(loginForm);

      signInWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      )
        .then((user) => {
          window.location.href = window.location.origin;
        })
        .catch((error) => {
          console.table(error);
          if (wrongAttemps > 2) {
            displayAlert(
              "Wpisałeś 3 razy złe hasło, jezeli ponownie wpiszesz zle hasło Twoje konto zostanie zablokowane",
              "warning"
            );
          }
          if (error.code === "auth/user-not-found") {
            displayAlert(
              "Nie znaleziono uzytkownika o podanym adresie e-mail.",
              "warning"
            );
          }
          if (error.code === "auth/wrong-password") {
            wrongAttemps++;
            displayAlert("Podałeś nieprawidłowe hasło!", "warning");
          }
        });
    });
  }
};

export const initSignOut = (auth) => {
  const signOutButton = document.querySelector("#signOut");

  if (signOutButton) {
    signOutButton.addEventListener("click", (event) => {
      event.preventDefault();

      signOut(auth).then((result) => {
        console.log("Pomyślne wylogowano");
      });
    });
  }
};

export const displayUserName = (userName) => {
  const userNameElement = document.querySelector("#userName");

  if (userNameElement) {
    userNameElement.innerHTML = userName;
  }
};

export const initSignWithGoogle = (auth) => {
  const button = document.querySelector("#signInWithGoogle");

  if (button) {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        location.href = location.origin;
      });
    });
  }
};
