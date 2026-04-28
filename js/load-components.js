// Load header, footer, and auth panel into each page (works without server)
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  loadFile('header.html', 'header-placeholder', function() {
    // Set active nav link based on current page
    setActiveNavLink();
  });

  // Load footer
  loadFile('footer.html', 'footer-placeholder', function() {
    // Set current year in footer
    const year = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach((span) => {
      span.textContent = String(year);
    });
  });

  // Load auth panel
  loadFile('authpanel.html', 'authpanel-placeholder');
});

// Function to load file content (works with file:// protocol)
function loadFile(filename, placeholderId, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  // Try using XMLHttpRequest (works in some browsers with file://)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', filename, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 0 || xhr.status === 200) {
        placeholder.innerHTML = xhr.responseText;
        if (callback) callback();
      } else {
        // Fallback: try fetch (requires server)
        fetch(filename)
          .then(response => response.text())
          .then(data => {
            placeholder.innerHTML = data;
            if (callback) callback();
          })
          .catch(error => {
            console.error('Error loading ' + filename + ':', error);
            // If both fail, show error message
            placeholder.innerHTML = '<p style="color: red;">Error loading ' + filename + '. Please use a local server.</p>';
          });
      }
    }
  };
  xhr.send(null);
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
