document.getElementById('logout-link').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Remove login state from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to index.html
    window.location.href = 'index.html';
});




// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetElement = document.querySelector(this.getAttribute('href'));
  
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active state for the clicked link
            document.querySelectorAll('nav ul li a').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        } else {
            console.log(`Section "${this.getAttribute('href')}" does not exist.`);
        }
    });
  });
  
  
  // Detect Scroll and Show Contact Section When Scrolled Past Courses Section
  window.addEventListener('scroll', function () {
    const coursesSection = document.getElementById('courses-section');
    const contactSection = document.getElementById('contact');
  
    if (coursesSection) {
        const coursesSectionTop = coursesSection.getBoundingClientRect().top;
  
        if (coursesSectionTop < window.innerHeight) {
            contactSection.classList.add('visible');
        } else {
            contactSection.classList.remove('visible');
        }
  
        // Update active state for navigation links on scroll
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
  
            if (sectionTop >= 0 && sectionTop < window.innerHeight / 2) {
                const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
                if (activeLink) {
                    document.querySelectorAll('nav ul li a').forEach(nav => nav.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }
  });
  

    let subMenu = document.getElementById("subMenu");

    // Function to toggle the dropdown menu
    function toggleSubMenu() {
        // If the submenu is open, close it. Otherwise, open it.
        subMenu.classList.toggle("open-menu");
    }

    // Close the menu when clicking outside of it
    document.addEventListener("click", (event) => {
        // Check if the click is outside of the submenu and the user icon
        if (!subMenu.contains(event.target) && !event.target.closest('.fa-user')) {
            subMenu.classList.remove("open-menu"); // Close the menu if clicked outside
        }
    });

    // Prevent clicks within the dropdown from closing it
    subMenu.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up to the document
    });


        
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('button3').addEventListener('click', function() {
            window.location.href = 'workouts.html';
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('button1').addEventListener('click', function() {
            window.location.href = 'healthymeals.html';
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('button2').addEventListener('click', function() {
            window.location.href = 'tracalorie/calorietracker.html';
        });
    });
    

  
  // Check login status and update navbar
  window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const authButtons = document.getElementById('auth-buttons');
    const profileIcon = document.getElementById('profile-icon');
  
    if (authButtons && profileIcon) {
        if (isLoggedIn) {
            authButtons.style.display = 'none'; // Hide Sign Up and Log In buttons
            profileIcon.style.display = 'block'; // Show Profile icon
        } else {
            authButtons.style.display = 'block'; // Show Sign Up and Log In buttons
            profileIcon.style.display = 'none'; // Hide Profile icon
        }
    }
  
    // Simulated login function for testing (you can replace this with actual logic)
    // setTimeout(() => {
    //     localStorage.setItem('isLoggedIn', 'true'); // Simulate successful login
    //     window.location.reload(); // Reload the page to update the navbar
    // }, 2000); // Simulate login delay
  };


  function performSearch() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();

    // Redirect based on user input
    if (searchQuery === "weight loss") {
        window.location.href = "weightloss.html";
    } else {
        alert("No results found. Please try another search.");
    }
}

// Optionally, you can log the user's input for debugging or add features like autocomplete:
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value.trim();
    console.log('User input:', query); // Log user input (for debugging purposes)
});



function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}

function toggleSubMenu() {
    var subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}
