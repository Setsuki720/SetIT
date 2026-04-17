import { QUESTS_DB, currentDifficulty, selectedCategories, currentQuests, questHistory, user } from './data.js';
import { saveToLocalStorage } from './storage.js';
import { updateProfileUI, checkAndAwardStreak } from './profile.js';
import { updateHistoryRecordStatus, renderHistoryTable } from './history.js';

export function generateQuests() {
    // Фильтрация
    let filtered = [];
    for (let i = 0; i < QUESTS_DB.length; i++) {
        const q = QUESTS_DB[i];
        const diffMatch = currentDifficulty === "all" || q.difficulty === currentDifficulty;
        
        let catMatch = false;
        for (let j = 0; j < selectedCategories.length; j++) {
            if (selectedCategories[j] === q.category) {
                catMatch = true;
                break;
            }
        }
        
        if (diffMatch && catMatch) {
            filtered.push(q);
        }
    }
    
    const questsListDiv = document.getElementById("questsList");
    if (!questsListDiv) return;
    
    if (filtered.length === 0) {
        questsListDiv.innerHTML = '<div class="empty-state">⚠️ Нет квестов под выбранные фильтры. Измените настройки.</div>';
        currentQuests.length = 0;
        return;
    }
    
    // Случайное количество от 1 до 3
    const count = Math.floor(Math.random() * 3) + 1;
    
    // Перемешивание
    let shuffled = [];
    for (let i = 0; i < filtered.length; i++) {
        shuffled.push(filtered[i]);
    }
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    
    const selectedQuests = [];
    for (let i = 0; i < count && i < shuffled.length; i++) {
        selectedQuests.push(shuffled[i]);
    }
    
    const newCurrentQuests = [];
    const now = new Date().toLocaleString();
    
    for (let i = 0; i < selectedQuests.length; i++) {
        const quest = selectedQuests[i];
        const recordId = Date.now() + Math.random() * 1000 + quest.id;
        const newRecord = {
            recordId: recordId,
            questId: quest.id,
            title: quest.title,
            difficulty: quest.difficulty,
            status: "pending",
            date: now,
            createdAt: now
        };
        questHistory.push(newRecord);
        newCurrentQuests.push({
            recordId: recordId,
            id: quest.id,
            title: quest.title,
            description: quest.description,
            difficulty: quest.difficulty,
            category: quest.category
        });
    }
    
    saveToLocalStorage();
    currentQuests.length = 0;
    for (let i = 0; i < newCurrentQuests.length; i++) {
        currentQuests.push(newCurrentQuests[i]);
    }
    renderQuests();
    renderHistoryTable();
    updateProfileUI();
}

export function renderQuests() {
    const container = document.getElementById("questsList");
    if (!container) return;
    
    if (currentQuests.length === 0) {
        container.innerHTML = '<div class="empty-state">✨ Нажмите "Получить квест" ✨</div>';
        return;
    }
    
    let html = "";
    for (let i = 0; i < currentQuests.length; i++) {
        const quest = currentQuests[i];
        let difficultyText = "";
        if (quest.difficulty === 'easy') difficultyText = 'Лёгкий';
        else if (quest.difficulty === 'medium') difficultyText = 'Средний';
        else difficultyText = 'Сложный';
        
        html += `
            <div class="quest-card">
                <h3>📌 ${quest.title}</h3>
                <p>${quest.description}</p>
                <div>
                    <span class="badge diff-${quest.difficulty}">${difficultyText}</span>
                    <span class="badge">#${quest.category}</span>
                </div>
                <div class="quest-actions">
                    <button class="btn-complete" data-recordid="${quest.recordId}">✅ Выполнить</button>
                    <button class="btn-skip" data-recordid="${quest.recordId}">⏭ Пропустить</button>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
    
    // Обработчики для кнопок "Выполнить"
    const completeBtns = document.querySelectorAll('.btn-complete');
    for (let i = 0; i < completeBtns.length; i++) {
        const btn = completeBtns[i];
        btn.addEventListener('click', function(e) {
            const recordId = btn.getAttribute('data-recordid');
            let quest = null;
            for (let j = 0; j < currentQuests.length; j++) {
                if (currentQuests[j].recordId == recordId) {
                    quest = currentQuests[j];
                    break;
                }
            }
            if (quest) completeQuest(quest);
        });
    }
    
    // Обработчики для кнопок "Пропустить"
    const skipBtns = document.querySelectorAll('.btn-skip');
    for (let i = 0; i < skipBtns.length; i++) {
        const btn = skipBtns[i];
        btn.addEventListener('click', function(e) {
            const recordId = btn.getAttribute('data-recordid');
            let quest = null;
            for (let j = 0; j < currentQuests.length; j++) {
                if (currentQuests[j].recordId == recordId) {
                    quest = currentQuests[j];
                    break;
                }
            }
            if (quest) skipQuest(quest);
        });
    }
}

export function completeQuest(questWithRecord) {
    updateHistoryRecordStatus(questWithRecord.recordId, "completed");
    user.currentStreak += 1;
    checkAndAwardStreak(user.currentStreak);
    saveToLocalStorage();
    updateProfileUI();
    
    // Удаляем из активных
    const newCurrentQuests = [];
    for (let i = 0; i < currentQuests.length; i++) {
        if (currentQuests[i].recordId !== questWithRecord.recordId) {
            newCurrentQuests.push(currentQuests[i]);
        }
    }
    currentQuests.length = 0;
    for (let i = 0; i < newCurrentQuests.length; i++) {
        currentQuests.push(newCurrentQuests[i]);
    }
    renderQuests();
}

export function skipQuest(questWithRecord) {
    updateHistoryRecordStatus(questWithRecord.recordId, "skipped");
    user.currentStreak = 0;
    saveToLocalStorage();
    updateProfileUI();
    
    // Удаляем из активных
    const newCurrentQuests = [];
    for (let i = 0; i < currentQuests.length; i++) {
        if (currentQuests[i].recordId !== questWithRecord.recordId) {
            newCurrentQuests.push(currentQuests[i]);
        }
    }
    currentQuests.length = 0;
    for (let i = 0; i < newCurrentQuests.length; i++) {
        currentQuests.push(newCurrentQuests[i]);
    }
    renderQuests();
}
