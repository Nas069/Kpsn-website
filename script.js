// ========================
// FAQ Toggle Script
// ========================
document.addEventListener('DOMContentLoaded', function () {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
  });
});

// ============================
// ADMIN LOGIN FUNCTION
// ============================
function adminLogin(event) {
  event.preventDefault();
  const password = document.getElementById('admin-password').value;
  const correctPassword = "kpsn2025"; // 🔐 CHANGE THIS TO YOUR SECRET

  if (password === correctPassword) {
    window.location.href = "upload.html";
  } else {
    document.getElementById('login-message').textContent = "Incorrect password!";
  }
}

// ============================
// SECURE ADMIN LOGIN SYSTEM
// ============================
function secureAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById('admin-username').value.trim();
  const password = document.getElementById('admin-password').value.trim();

  const validUsername = "adminkpsn";       // ✅ Change this
  const validPassword = "kpsn2025?";    // ✅ Change this

  if (username === validUsername && password === validPassword) {
    localStorage.setItem('adminLoggedIn', true);
    window.location.href = "upload.html";
  } else {
    document.getElementById('login-message').textContent = "Incorrect username or password.";
  }
}

function logoutAdmin() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = "index.html";
}

// ==============================
// AUTO GALLERY UPLOAD SCRIPT
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const galleryForm = document.getElementById('galleryForm');
  if (galleryForm) {
    galleryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const caption = document.getElementById('caption').value;
      const imageFile = document.getElementById('imageFile').files[0];
      const status = document.getElementById('uploadStatus');

      if (!imageFile) {
        status.textContent = "Please select an image.";
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result;

        let galleryData = [];

        // Fetch existing gallery.json content
        try {
          const res = await fetch('../Uploads/gallery.json');
          galleryData = await res.json();
        } catch (err) {
          console.error("Failed to load gallery.json");
        }

        // Add new entry
        galleryData.push({
          caption,
          image: base64Image,
          date: new Date().toLocaleDateString()
        });

        // Save to localStorage (used here because we don't have server write access)
        localStorage.setItem('galleryData', JSON.stringify(galleryData));
        status.textContent = "✅ Photo added locally. Will display on media page.";

        // Optionally redirect or reset form
        galleryForm.reset();
      };
      reader.readAsDataURL(imageFile);
    });
  }
});

// ============================
// MEMBER SUBMISSION TO JSON
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const memberForm = document.getElementById('memberForm');
  if (memberForm) {
    memberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const member = {
        name: document.getElementById('memberName').value,
        lga: document.getElementById('memberLGA').value,
        ward: document.getElementById('memberWard').value,
        phone: document.getElementById('memberPhone').value
      };

      let members = JSON.parse(localStorage.getItem('kpsnMembers')) || [];
      members.push(member);
      localStorage.setItem('kpsnMembers', JSON.stringify(members));
      document.getElementById('memberStatus').textContent = "✅ Member saved locally!";
      memberForm.reset();
    });
  }

  // ========================
  // NEWS POST TO JSON
  // ========================
  const newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const news = {
        title: document.getElementById('newsTitle').value,
        date: document.getElementById('newsDate').value,
        summary: document.getElementById('newsSummary').value
      };

      let newsList = JSON.parse(localStorage.getItem('kpsnNews')) || [];
      newsList.push(news);
      localStorage.setItem('kpsnNews', JSON.stringify(newsList));
      document.getElementById('newsStatus').textContent = "✅ News saved locally!";
      newsForm.reset();
    });
  }
});