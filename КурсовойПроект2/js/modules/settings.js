import { selectedCategories, currentDifficulty, setCurrentDifficulty, setSelectedCategories, getAllCategories } from './data.js';
import { saveToLocalStorage } from './storage.js';

export function renderCategoryCheckboxes(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const allCats = getAllCategories();
    container.innerHTML = "";
    
    for (let i = 0; i < allCats.length; i++) {
        const cat = allCats[i];
        const label = document.createElement("label");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = cat;
        
        // Проверяем, выбран ли этот категория
        let isChecked = false;
        for (let j = 0; j < selectedCategories.length; j++) {
            if (selectedCategories[j] === cat) {
                isChecked = true;
                break;
            }
        }
        cb.checked = isChecked;
        
        // ИСПРАВЛЕНИЕ: используем замыкание правильно
        cb.addEventListener("change", (function(category) {
            return function(e) {
                // Создаём новый массив выбранных категорий
                const newSelected = [];
                
                // Получаем все чекбоксы из ОБОИХ контейнеров
                const mainCbs = document.querySelectorAll('#mainCategories input[type="checkbox"]');
                const settingsCbs = document.querySelectorAll('#settingsCategories input[type="checkbox"]');
                
                // Определяем, какой контейнер использовать как источник истины
                const sourceCbs = (containerId === 'mainCategories') ? mainCbs : 
                                 (containerId === 'settingsCategories') ? settingsCbs : 
                                 e.target.closest('.categories-check').querySelectorAll('input[type="checkbox"]');
                
                // Собираем все отмеченные категории
                for (let k = 0; k < sourceCbs.length; k++) {
                    if (sourceCbs[k].checked) {
                        newSelected.push(sourceCbs[k].value);
                    }
                }
                
                // Обновляем глобальный массив
                setSelectedCategories(newSelected);
                
                // Синхронизируем второй контейнер
                const otherId = (containerId === 'mainCategories') ? 'settingsCategories' : 'mainCategories';
                const otherCbs = document.querySelectorAll(`#${otherId} input[type="checkbox"]`);
                for (let k = 0; k < otherCbs.length; k++) {
                    const cb = otherCbs[k];
                    cb.checked = newSelected.includes(cb.value);
                }
                
                saveToLocalStorage();
            };
        })(cat));
        
        label.appendChild(cb);
        label.appendChild(document.createTextNode(` ${cat}`));
        container.appendChild(label);
    }
}

export function syncSettings() {
    const mainDiff = document.getElementById("mainDifficulty");
    const settingsDiff = document.getElementById("settingsDifficulty");
    
    if (mainDiff && settingsDiff) {
        mainDiff.value = currentDifficulty;
        settingsDiff.value = currentDifficulty;
        
        mainDiff.addEventListener("change", function(e) {
            setCurrentDifficulty(e.target.value);
            settingsDiff.value = currentDifficulty;
            saveToLocalStorage();
        });
        
        settingsDiff.addEventListener("change", function(e) {
            setCurrentDifficulty(e.target.value);
            mainDiff.value = currentDifficulty;
            saveToLocalStorage();
        });
    }
}