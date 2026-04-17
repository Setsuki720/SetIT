import { renderHistoryTable } from './history.js';
import { updateProfileUI, renderRewards } from './profile.js';

export function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");
    
    for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i];
        link.addEventListener("click", function(e) {
            const pageId = link.getAttribute("data-page");
            
            // Убираем active у всех ссылок
            for (let j = 0; j < navLinks.length; j++) {
                navLinks[j].classList.remove("active");
            }
            link.classList.add("active");
            
            // Убираем active у всех страниц
            for (let j = 0; j < pages.length; j++) {
                pages[j].classList.remove("active");
            }
            
            const activePage = document.getElementById(`page-${pageId}`);
            if (activePage) activePage.classList.add("active");
            
            if (pageId === "history") renderHistoryTable();
            if (pageId === "profile") {
                updateProfileUI();
                renderRewards();
            }
        });
    }
}