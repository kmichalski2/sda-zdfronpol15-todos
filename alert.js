export const displayAlert = (message, type) => {
  const container = document.querySelector("#alert");

  if (container) {
    console.log(message);
    const alert = `<div class="alert alert-${type}" role="alert">${message}</div>`;

    container.innerHTML += alert;
  } else {
    throw new Error("Aby, wyświetlić alert dodaj element HTML z id #alert");
  }
};
