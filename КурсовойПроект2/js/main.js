import { user, setUser } from './modules/data.js';
import { loadFromLocalStorage, saveToLocalStorage, resetAllProgress } from './modules/storage.js';
import { generateQuests, renderQuests } from './modules/quests.js';
import { updateProfileUI, renderRewards } from './modules/profile.js';
import { renderHistoryTable, clearHistory } from './modules/history.js';
import { renderCategoryCheckboxes, syncSettings } from './modules/settings.js';
import { initNavigation } from './modules/navigation.js';

// ИНИЦИАЛИЗАЦИЯ
function init() {
    loadFromLocalStorage();
    
    // Поле имени
    const userNameEl = document.getElementById("userName");
    if (userNameEl) {
        userNameEl.addEventListener("input", function(e) {
            setUser({
                name: e.target.value || "Путник",
                regDate: user.regDate,
                currentStreak: user.currentStreak
            });
            saveToLocalStorage();
            updateProfileUI();
        });
    }
    
    // Кнопка получения квеста
    const getQuestBtn = document.getElementById("getQuestBtn");
    if (getQuestBtn) getQuestBtn.addEventListener("click", generateQuests);
    
    // Кнопка очистки истории
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", clearHistory);
    
    // Кнопка сброса прогресса
    const resetAllBtn = document.getElementById("resetAllBtn");
    if (resetAllBtn) resetAllBtn.addEventListener("click", resetAllProgress);
    
    // Фильтр истории
    const historyFilter = document.getElementById("historyStatusFilter");
    if (historyFilter) historyFilter.addEventListener("change", function() {
        renderHistoryTable();
    });
    
    // Рендер чекбоксов категорий
    renderCategoryCheckboxes("mainCategories");
    renderCategoryCheckboxes("settingsCategories");
    
    // Синхронизация настроек сложности
    syncSettings();
    
    // Навигация
    initNavigation();
    
    // Обновление UI
    updateProfileUI();
    renderRewards();
    renderHistoryTable();
    renderQuests();
}

// Запуск
init();