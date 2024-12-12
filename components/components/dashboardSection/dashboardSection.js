// script.js
const hamburgerButton = document.getElementById('hamburgerButton');
const closeButton = document.getElementById('closeButton');
const sidebar = document.getElementById('sidebar');

// Open the sidebar when the hamburger button is clicked
hamburgerButton.addEventListener('click', () => {
  console.log('hamburger clicked !')
  sidebar.classList.add('open');   // Show the sidebar
  hamburgerButton.classList.add('hidden'); // Hide the hamburger button
});

// Close the sidebar when the close button is clicked
closeButton.addEventListener('click', () => {
  sidebar.classList.remove('open');  // Hide the sidebar
  hamburgerButton.classList.remove('hidden'); // Show the hamburger button
});
