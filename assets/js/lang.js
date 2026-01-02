/**
 * lang.js - Manejador de idiomas para Talento Sin Fronteras
 */

// Función principal para cambiar el idioma
function changeLanguage(lang) {
    // Buscamos el objeto de traducciones global
    const translations = window.TRANSLATIONS;

    // Verificamos que las traducciones existan
    if (!translations || !translations[lang]) {
        console.error("Error: No se encontró el objeto de traducciones para:", lang);
        return;
    }

    // Guardar preferencia en el navegador
    localStorage.setItem("lang", lang);

    // Actualizar indicador visual en el botón (ES / EN)
    const currentLangEl = document.getElementById("currentLang");
    if (currentLangEl) {
        currentLangEl.textContent = lang.toUpperCase();
    }

    // Cerrar el menú si existe
    const langMenu = document.getElementById("langMenu");
    if (langMenu) {
        langMenu.classList.add("hidden");
    }

    // 1. Traducir elementos de texto normal
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // 2. Traducir Placeholders (Inputs y Textareas)
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

// Hacer la función accesible globalmente para los botones onclick
window.changeLanguage = changeLanguage;

// Configuración de eventos cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");

    // Lógica del menú desplegable
    if (langBtn && langMenu) {
        langBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            langMenu.classList.toggle("hidden");
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
                langMenu.classList.add("hidden");
            }
        });
    }

    // Cargar idioma inicial (guardado o por defecto español)
    const savedLang = localStorage.getItem("lang") || "es";
    
    // Pequeño delay para asegurar que translation.js se haya procesado
    setTimeout(() => {
        changeLanguage(savedLang);
    }, 10);
});