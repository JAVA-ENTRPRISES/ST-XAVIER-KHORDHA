// Main JavaScript file for school website

document.addEventListener('DOMContentLoaded', function() {
  // Back to top button functionality
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Auth panel toggle functionality
  // NOTE: Auth panel is loaded dynamically, so we use event delegation.
  document.addEventListener('click', function(e) {
    const button = e.target.closest('.auth-toggle button');
    if (!button) return;

    const target = button.getAttribute('data-target');
    if (!target) return;

    // Scope to the nearest auth panel (safer if multiple panels exist)
    const panel = button.closest('[data-auth-panel]') || document;
    const authToggleButtons = panel.querySelectorAll('.auth-toggle button');
    const authForms = panel.querySelectorAll('.auth-form');

    // Update button states
    authToggleButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.classList.add('btn-outline-primary');
      btn.classList.remove('btn-primary');
    });
    button.classList.add('active');
    button.classList.remove('btn-outline-primary');
    button.classList.add('btn-primary');

    // Show/hide forms
    authForms.forEach(form => {
      if (form.getAttribute('data-form') === target) {
        form.classList.remove('d-none');
      } else {
        form.classList.add('d-none');
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector('input[type="text"]').value.trim();
      const email = this.querySelector('input[type="email"]').value.trim();
      const phone = this.querySelector('input[type="tel"]').value.trim();
      const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
      const message = this.querySelector('textarea').value.trim();

      // Basic validation
      if (!name || !email || !phone || !subject || !message) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill in all fields.'
          });
        } else {
          alert('Please fill in all fields.');
        }
        return;
      }

      // Send directly to email using FormSubmit (no custom backend needed)
      const payload = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        _subject: 'New Contact Form Submission - St Xavier School',
        _template: 'table'
      };

      fetch('https://formsubmit.co/ajax/xaviers.khurda@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then((response) => response.json())
        .then((result) => {
          if (result && result.success === 'true') {
            if (typeof Swal !== 'undefined') {
              Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully',
                text: 'Your query has been sent successfully.'
              });
            } else {
              alert('Submitted successfully. Your query has been sent.');
            }
            this.reset();
            return;
          }

          if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'error',
              title: 'Submission Failed',
              text: 'Unable to send your query right now. Please try again.'
            });
          } else {
            alert('Unable to send your query right now. Please try again.');
          }
        })
        .catch(() => {
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'error',
              title: 'Network Error',
              text: 'Please check internet connection and try again.'
            });
          } else {
            alert('Network error. Please try again.');
          }
        });
    });
  }

  // Mandatory Disclosure: View Documents buttons
  // Usage: add `data-doc-url="assets/docs/your-file.pdf"` on the button to open a PDF in a new tab.
  // If no URL is provided, show a SweetAlert "No documents are uploaded".
  const viewDocButtons = document.querySelectorAll('.view-doc-btn');
  if (viewDocButtons.length) {
    viewDocButtons.forEach((btn) => {
      btn.addEventListener('click', function() {
        const url = (this.getAttribute('data-doc-url') || '').trim();

        if (!url) {
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'info',
              title: 'No Documents',
              text: 'No documents are uploaded'
            });
          } else {
            alert('No documents are uploaded');
          }
          return;
        }

        const lowerUrl = url.toLowerCase();
        const isPdf =
          lowerUrl.endsWith('.pdf') ||
          lowerUrl.startsWith('blob:') ||
          lowerUrl.startsWith('data:application/pdf');

        if (!isPdf) {
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'error',
              title: 'Invalid Document',
              text: 'Please upload a PDF document.'
            });
          } else {
            alert('Please upload a PDF document.');
          }
          return;
        }

        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  // Auth form handling
  const loginForm = document.querySelector('[data-form="login"] form');
  const registerForm = document.querySelector('[data-form="register"] form');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'info',
          title: 'Login',
          text: 'Login functionality will be implemented soon.'
        });
      } else {
        alert('Login functionality will be implemented soon.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;

      if (password !== confirmPassword) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Passwords do not match.'
          });
        } else {
          alert('Passwords do not match.');
        }
        return;
      }

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Registration',
          text: 'Registration functionality will be implemented soon.'
        });
      } else {
        alert('Registration functionality will be implemented soon.');
      }
    });
  }
});
