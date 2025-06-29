// script.js

// --- SELECTORES GLOBALES ---
const body = document.body;
const langToggle = document.getElementById('lang-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');


// --- LÓGICA DE MODO OSCURO ---
const enableDarkMode = () => {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
};

// Evento al hacer clic en el botón de modo oscuro
darkModeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    isDarkMode ? disableDarkMode() : enableDarkMode();
});


// --- LÓGICA DE CAMBIO DE IDIOMA ---
const setLanguage = (lang) => {
    if (lang === 'en') {
        body.classList.add('english-mode');
        document.documentElement.setAttribute('lang', 'en');
        localStorage.setItem('language', 'en');
    } else {
        body.classList.remove('english-mode');
        document.documentElement.setAttribute('lang', 'es');
        localStorage.setItem('language', 'es');
    }
};

// Evento al hacer clic en el botón de idioma
langToggle.addEventListener('click', () => {
    const currentLang = body.classList.contains('english-mode') ? 'es' : 'en';
    setLanguage(currentLang);
});


// --- LÓGICA PARA EL SCROLL SUAVE DE LA NAVEGACIÓN ---
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// --- LÓGICA PARA LA ANIMACIÓN AL HACER SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden-section');
hiddenElements.forEach((el) => observer.observe(el));


// --- LÓGICA DE INICIALIZACIÓN AL CARGAR LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el modo oscuro basándose en la preferencia guardada o del sistema
    const savedDarkMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedDarkMode === 'enabled' || (savedDarkMode === null && systemPrefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Por tu petición anterior, no inicializamos el idioma desde localStorage
    // para que siempre empiece en español.
});