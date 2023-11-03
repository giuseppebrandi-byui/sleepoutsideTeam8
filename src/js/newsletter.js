// Getting the modal elements after the user has clicked on the newsletter subscription box

const newsletterForm = document.querySelector("#newsletter-form");
const modal = document.querySelector("#thank-you-modal");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailNewsLetter = document.querySelector("[name=email]").value;
  if (emailNewsLetter !== "") {
    modal.style.display = "block";
  }
  const newsLetterCloseBtn = document.querySelector(".newsLetterCloseBtn");
  newsLetterCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
    newsletterForm.reset();
  });
});
