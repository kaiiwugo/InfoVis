// Get all the links in the navigation bar
const navLinks = document.querySelectorAll('nav ul li a');

// Get the sections on the page
const sections = document.querySelectorAll('section');

// Function to check if an element is in view
function isInView(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to update the active link in the navigation bar
function updateActiveLink() {
  // Loop through all the sections and check if they are in view
  sections.forEach((section, index) => {
    if (isInView(section)) {
      // If the section is in view, add the 'active' class to the corresponding link
      navLinks.forEach((navLink) => {
        navLink.classList.remove('active');
      });
      navLinks[index].classList.add('active');
    }
  });
}

// Listen for scroll events and update the active link
window.addEventListener('scroll', updateActiveLink);
