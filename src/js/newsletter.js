// Getting the modal elements after the user has clicked on the newsletter subscription box

document.addEventListener("DOMContentLoaded", () => {

// const form = document.querySelector("newsletter-form");
const form = document.querySelector(".newsletter-form");
const modal = document.getElementById("thank-you-modal");

// This is to show the modal box on form submit
form.addEventListener("submit", e => {
    e.preventDefault();
    showModal();
});

function showModal() {  
    modal.style.display = "block";
}


// This is to hide the modal box when you click it
modal.addEventListener("click", () => {
    modal.style.display = "none";
});

});