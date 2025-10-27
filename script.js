// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active nav link
        document
          .querySelectorAll(".header__nav-link, .mobile-nav__link")
          .forEach((link) => {
            link.classList.remove("active");
          });
        this.classList.add("active");

        // Close mobile menu if open
        mobileNav.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Mobile navigation
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNavLinks = mobileNav.querySelectorAll(".mobile-nav__link");

  mobileMenuButton.addEventListener("click", function () {
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  mobileNavClose.addEventListener("click", function () {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Works Slider
  const sliderTrack = document.getElementById("sliderTrack");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  const works = [
    {
      title: "Видео для кофейни",
      description: "Рекламный ролик для Instagram",
    },
    {
      title: "Бьюти-бренд",
      description: "Серия сторис для продвижения",
    },
    {
      title: "Ресторан",
      description: "Видео-обзор меню",
    },
    {
      title: "Фитнес-центр",
      description: "Трансформации клиентов",
    },
    {
      title: "Магазин одежды",
      description: "Lookbook видео",
    },
    {
      title: "Салон красоты",
      description: "Процесс работы мастеров",
    },
    {
      title: "Кафе",
      description: "Видео-презентация",
    },
    {
      title: "Фотограф",
      description: "Портфолио в движении",
    },
    {
      title: "Ювелирный бренд",
      description: "Демонстрация коллекции",
    },
    {
      title: "Турагентство",
      description: "Видео-отзывы о путешествиях",
    },
  ];

  // Generate work cards
  works.forEach((work, index) => {
    const workCard = document.createElement("div");
    workCard.className = "work-card";
    workCard.innerHTML = `
            <div class="work-card__image">
                Работа ${index + 1}
            </div>
            <div class="work-card__content">
                <h3 class="work-card__title">${work.title}</h3>
                <p class="work-card__description">${work.description}</p>
            </div>
        `;
    sliderTrack.appendChild(workCard);
  });

  let currentPosition = 0;
  const cardWidth = sliderTrack.children[0].offsetWidth + 20; // width + gap
  const visibleCards = 5;
  const totalCards = works.length;

  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${
      currentPosition * cardWidth
    }px)`;

    prevButton.disabled = currentPosition === 0;
    nextButton.disabled = currentPosition >= totalCards - visibleCards;
  }

  prevButton.addEventListener("click", function () {
    if (currentPosition > 0) {
      currentPosition--;
      updateSlider();
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPosition < totalCards - visibleCards) {
      currentPosition++;
      updateSlider();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    cardWidth = sliderTrack.children[0].offsetWidth + 20;
    updateSlider();
  });

  // Booking Popup
  const bookingPopup = document.getElementById("bookingPopup");
  const bookButtons = document.querySelectorAll(".header__book-button");
  const closeBookingPopup = document.getElementById("closeBookingPopup");
  const bookingForm = document.getElementById("bookingForm");
  const bookingSubmit = document.getElementById("bookingSubmit");

  // Generate available dates for booking
  function generateAvailableDates() {
    const dateSelect = document.querySelector('select[name="date"]');
    const today = new Date();

    // Clear existing options except the first one
    while (dateSelect.options.length > 1) {
      dateSelect.remove(1);
    }

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const option = document.createElement("option");
        option.value = date.toISOString().split("T")[0];
        option.textContent = date.toLocaleDateString("ru-RU", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
        dateSelect.appendChild(option);
      }
    }
  }

  // Real-time validation
  function validateField(name, value) {
    const errorElement = document.getElementById(name + "Error");

    // Clear previous error state
    errorElement.classList.remove("show");

    let isValid = true;
    let errorMessage = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Имя обязательно";
          isValid = false;
        } else if (value.trim().length < 2) {
          errorMessage = "Имя должно содержать минимум 2 символа";
          isValid = false;
        }
        break;

      case "phone":
        const phoneRegex =
          /^(\+7|8)[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
        if (!value.trim()) {
          errorMessage = "Телефон обязателен";
          isValid = false;
        } else if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          errorMessage = "Введите корректный российский номер";
          isValid = false;
        }
        break;

      case "telegram":
        if (value.trim() && !value.trim().startsWith("@")) {
          errorMessage = "Telegram должен начинаться с @";
          isValid = false;
        }
        break;

      case "date":
        if (!value) {
          errorMessage = "Выберите дату консультации";
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
    }

    return isValid;
  }

  // Event listeners for real-time validation
  bookingForm.addEventListener("input", function (e) {
    if (e.target.name) {
      validateField(e.target.name, e.target.value);
    }
  });

  bookingForm.addEventListener("change", function (e) {
    if (e.target.name) {
      validateField(e.target.name, e.target.value);
    }
  });

  // Open booking popup
  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      generateAvailableDates();
      bookingPopup.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close booking popup
  closeBookingPopup.addEventListener("click", function () {
    bookingPopup.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close popup when clicking outside
  bookingPopup.addEventListener("click", function (e) {
    if (e.target === bookingPopup) {
      bookingPopup.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Close popup with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && bookingPopup.classList.contains("active")) {
      bookingPopup.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Form submission
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    let isValid = true;

    // Validate all fields
    for (let [name, value] of formData) {
      if (!validateField(name, value)) {
        isValid = false;
      }
    }

    if (isValid) {
      bookingSubmit.disabled = true;
      bookingSubmit.textContent = "Отправка...";

      // Simulate form submission
      setTimeout(function () {
        alert("Заявка отправлена! Я свяжусь с вами в ближайшее время.");
        bookingForm.reset();
        bookingPopup.classList.remove("active");
        document.body.style.overflow = "auto";
        bookingSubmit.disabled = false;
        bookingSubmit.textContent = "Записаться";

        // Clear all errors
        document.querySelectorAll(".booking-form__error").forEach((error) => {
          error.classList.remove("show");
        });
      }, 2000);
    }
  });

  // Active section detection
  function setActiveSection() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(
      ".header__nav-link, .mobile-nav__link"
    );
    const scrollPos = window.scrollY + 100;

    let currentSection = "about";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveSection);
  setActiveSection(); // Initial call

  // Initialize the page
  generateAvailableDates();
  updateSlider();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Update active section with debounce
window.addEventListener("scroll", debounce(setActiveSection, 10));
