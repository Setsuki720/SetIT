// ==================== БАЗА КВЕСТОВ ====================
const QUESTS_DB = [
    { id: 1, title: "Скажи комплимент", description: "Сделайте искренний комплимент коллеге или знакомому.", difficulty: "medium", category: "коммуникация" },
    { id: 2, title: "10 минут тишины", description: "Побудьте в тишине, наблюдая за дыханием.", difficulty: "easy", category: "самоанализ" },
    { id: 3, title: "Экспромт-стих", description: "Напишите короткое стихотворение о сегодняшнем дне.", difficulty: "hard", category: "творчество" },
    { id: 4, title: "Обратная связь", description: "Попросите честную обратную связь у друга.", difficulty: "hard", category: "коммуникация" },
    { id: 5, title: "Утренние страницы", description: "Напишите 3 абзаца свободных мыслей.", difficulty: "easy", category: "самоанализ" },
    { id: 6, title: "Нарисуй эмоцию", description: "Изобразите своё настроение цветными карандашами.", difficulty: "medium", category: "творчество" },
    { id: 7, title: "Активное слушание", description: "В разговоре задайте 3 уточняющих вопроса.", difficulty: "medium", category: "коммуникация" },
    { id: 8, title: "Зона комфорта", description: "Сделайте то, что давно откладывали из-за страха.", difficulty: "hard", category: "самоанализ" },
    { id: 9, title: "Быстрый скетч", description: "Нарисуйте что угодно за 3 минуты.", difficulty: "easy", category: "творчество" },
    { id: 10, title: "План на завтра", description: "Запишите 3 важных дела на завтра.", difficulty: "easy", category: "самоанализ" },
    { id: 11, title: "Комплимент себе", description: "Напишите 3 вещи, которые в себе цените.", difficulty: "easy", category: "самоанализ" },
    { id: 12, title: "Новый маршрут", description: "Пройдите незнакомой дорогой до места.", difficulty: "medium", category: "коммуникация" }
];

// ==================== ГЛОБАЛЬНЫЕ ДАННЫЕ ====================
let user = {
    name: "Исследователь",
    regDate: new Date().toLocaleDateString(),
    currentStreak: 0
};

// Каждая запись истории имеет уникальный ID записи (recordId)
// Поля: recordId, questId, title, difficulty, status, date, createdAt
let questHistory = [];

let rewards = [];           // { id, name, streakValue, date }
let currentQuests = [];     // активные квесты на главной (содержат recordId)

// Настройки фильтрации
let currentDifficulty = "all";
let selectedCategories = [];

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
function getAllCategories() {
    return [...new Set(QUESTS_DB.map(q => q.category))];
}

function initCategories() {
    const allCats = getAllCategories();
    selectedCategories = [...allCats];
}

// Сохранение/загрузка localStorage
function saveToLocalStorage() {
    localStorage.setItem("quest_user", JSON.stringify(user));
    localStorage.setItem("quest_history", JSON.stringify(questHistory));
    localStorage.setItem("quest_rewards", JSON.stringify(rewards));
    localStorage.setItem("quest_settings", JSON.stringify({
        difficulty: currentDifficulty,
        categories: selectedCategories
    }));
}

function loadFromLocalStorage() {
    const savedUser = localStorage.getItem("quest_user");
    if (savedUser) user = JSON.parse(savedUser);
    else user.regDate = new Date().toLocaleDateString();
    
    const savedHistory = localStorage.getItem("quest_history");
    if (savedHistory) questHistory = JSON.parse(savedHistory);
    
    const savedRewards = localStorage.getItem("quest_rewards");
    if (savedRewards) rewards = JSON.parse(savedRewards);
    
    const savedSettings = localStorage.getItem("quest_settings");
    if (savedSettings) {
        const set = JSON.parse(savedSettings);
        currentDifficulty = set.difficulty || "all";
        selectedCategories = set.categories || getAllCategories();
    } else {
        initCategories();
    }
}

// Обновление UI профиля
function updateProfileUI() {
    document.getElementById("userName").value = user.name;
    document.getElementById("regDate").innerText = user.regDate;
    document.getElementById("currentStreak").innerText = user.currentStreak;
    document.getElementById("totalRewards").innerText = rewards.length;
    
    const totalQuests = questHistory.length;
    const completedCount = questHistory.filter(h => h.status === "completed").length;
    const percent = totalQuests === 0 ? 0 : Math.round((completedCount / totalQuests) * 100);
    document.getElementById("completedPercent").innerText = percent;
    
    let level = "Новичок";
    if (rewards.length >= 7) level = "Мастер";
    else if (rewards.length >= 3) level = "Эксперт";
    else if (rewards.length >= 1) level = "Практик";
    document.getElementById("userLevel").innerText = level;
    
    document.getElementById("greeting").innerHTML = `👋 ${user.name}, выбери квест для роста!`;
}

// Рендер наград в профиле
function renderRewards() {
    const container = document.getElementById("rewardsContainer");
    if (rewards.length === 0) {
        container.innerHTML = '<div class="empty-state">Пока нет наград. Выполняйте серии 3, 5, 7 дней!</div>';
        return;
    }
    container.innerHTML = rewards.map(r => `
        <div class="reward-badge">
            ⭐ ${r.name} <small>(${r.date})</small>
        </div>
    `).join('');
}

// Проверка и выдача наград за серию
function checkAndAwardStreak(newStreak) {
    const milestones = [3, 5, 7];
    for (let m of milestones) {
        if (newStreak === m && !rewards.some(r => r.streakValue === m)) {
            const newReward = {
                id: Date.now() + m,
                name: `Серия ${m} дней!`,
                streakValue: m,
                date: new Date().toLocaleDateString()
            };
            rewards.push(newReward);
            saveToLocalStorage();
            renderRewards();
            updateProfileUI();
            alert(`🎉 ПОЗДРАВЛЯЕМ! Получена награда: "Серия ${m} дней"`);
        }
    }
}

// Обновление статуса существующей записи в истории по recordId
function updateHistoryRecordStatus(recordId, newStatus) {
    const recordIndex = questHistory.findIndex(r => r.recordId === recordId);
    if (recordIndex !== -1) {
        questHistory[recordIndex].status = newStatus;
        questHistory[recordIndex].date = new Date().toLocaleString(); // обновляем дату выполнения/пропуска
        saveToLocalStorage();
        renderHistoryTable();
    }
}

// Выполнить квест
function completeQuest(questWithRecord) {
    // Обновляем статус записи в истории
    updateHistoryRecordStatus(questWithRecord.recordId, "completed");
    
    // Увеличиваем серию
    user.currentStreak += 1;
    checkAndAwardStreak(user.currentStreak);
    saveToLocalStorage();
    updateProfileUI();
    
    // Удаляем из активных
    currentQuests = currentQuests.filter(q => q.recordId !== questWithRecord.recordId);
    renderQuests();
}

// Пропустить квест
function skipQuest(questWithRecord) {
    // Обновляем статус записи в истории
    updateHistoryRecordStatus(questWithRecord.recordId, "skipped");
    
    // Сбрасываем серию
    user.currentStreak = 0;
    saveToLocalStorage();
    updateProfileUI();
    
    // Удаляем из активных
    currentQuests = currentQuests.filter(q => q.recordId !== questWithRecord.recordId);
    renderQuests();
}

// ==================== ГЕНЕРАЦИЯ КВЕСТОВ ====================
function generateQuests() {
    // Фильтрация по сложности и категориям
    let filtered = QUESTS_DB.filter(q => {
        const diffMatch = currentDifficulty === "all" || q.difficulty === currentDifficulty;
        const catMatch = selectedCategories.includes(q.category);
        return diffMatch && catMatch;
    });
    
    if (filtered.length === 0) {
        document.getElementById("questsList").innerHTML = '<div class="empty-state">⚠️ Нет квестов под выбранные фильтры. Измените настройки.</div>';
        currentQuests = [];
        return;
    }
    
    // Случайное количество от 1 до 3
    const count = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedQuests = shuffled.slice(0, count);
    
    // Для каждого выбранного квеста создаём НОВУЮ запись в истории со статусом "pending"
    const newCurrentQuests = [];
    const now = new Date().toLocaleString();
    
    selectedQuests.forEach(quest => {
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
            ...quest
        });
    });
    
    saveToLocalStorage();
    currentQuests = newCurrentQuests;
    renderQuests();
    renderHistoryTable();
    updateProfileUI(); // обновим процент выполнения
}

function renderQuests() {
    const container = document.getElementById("questsList");
    if (currentQuests.length === 0) {
        container.innerHTML = '<div class="empty-state">✨ Нажмите "Получить квест" ✨</div>';
        return;
    }
    
    container.innerHTML = currentQuests.map(quest => `
        <div class="quest-card">
            <h3>📌 ${quest.title}</h3>
            <p>${quest.description}</p>
            <div>
                <span class="badge diff-${quest.difficulty}">${quest.difficulty === 'easy' ? 'Лёгкий' : quest.difficulty === 'medium' ? 'Средний' : 'Сложный'}</span>
                <span class="badge">#${quest.category}</span>
            </div>
            <div class="quest-actions">
                <button class="btn-complete" data-recordid="${quest.recordId}">✅ Выполнить</button>
                <button class="btn-skip" data-recordid="${quest.recordId}">⏭ Пропустить</button>
            </div>
        </div>
    `).join('');
    
    // Вешаем обработчики
    document.querySelectorAll('.btn-complete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const recordId = btn.dataset.recordid;
            const quest = currentQuests.find(q => q.recordId == recordId);
            if (quest) completeQuest(quest);
        });
    });
    document.querySelectorAll('.btn-skip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const recordId = btn.dataset.recordid;
            const quest = currentQuests.find(q => q.recordId == recordId);
            if (quest) skipQuest(quest);
        });
    });
}

//  ИСТОРИЯ С ФИЛЬТРАМИ
function renderHistoryTable() {
    const filterValue = document.getElementById("historyStatusFilter").value;
    let filtered = [...questHistory];
    if (filterValue !== "all") {
        filtered = filtered.filter(h => h.status === filterValue);
    }
    
    // Сортируем по дате создания (новые сверху)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const tbody = document.getElementById("historyBody");
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Нет записей</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map(h => {
        let statusText = "";
        let statusClass = "";
        if (h.status === "pending") {
            statusText = "⏳ В ожидании (pending)";
            statusClass = "status-pending";
        } else if (h.status === "completed") {
            statusText = "✅ Выполнен";
            statusClass = "status-completed";
        } else {
            statusText = "⏭ Пропущен";
            statusClass = "status-skipped";
        }
        return `
            <tr>
                <td>${h.title}</td>
                <td>${h.difficulty}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${h.date}</td>
            </tr>
        `;
    }).join('');
}

function clearHistory() {
    if (confirm("Очистить всю историю квестов? Серия и награды сохранятся.")) {
        // Очищаем только историю, но не трогаем награды и серию
        questHistory = [];
        saveToLocalStorage();
        renderHistoryTable();
        updateProfileUI();
    }
}

//  НАСТРОЙКИ И ФИЛЬТРЫ 
function renderCategoryCheckboxes(containerId, syncToSelected = true) {
    const container = document.getElementById(containerId);
    const allCats = getAllCategories();
    container.innerHTML = "";
    allCats.forEach(cat => {
        const label = document.createElement("label");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = cat;
        cb.checked = selectedCategories.includes(cat);
        cb.addEventListener("change", (e) => {
            if (e.target.checked) {
                if (!selectedCategories.includes(cat)) selectedCategories.push(cat);
            } else {
                selectedCategories = selectedCategories.filter(c => c !== cat);
            }
            saveToLocalStorage();
            renderCategoryCheckboxes("mainCategories", true);
            renderCategoryCheckboxes("settingsCategories", true);
        });
        label.appendChild(cb);
        label.appendChild(document.createTextNode(` ${cat}`));
        container.appendChild(label);
    });
}

// Синхронизация настроек
function syncSettings() {
    const mainDiff = document.getElementById("mainDifficulty");
    const settingsDiff = document.getElementById("settingsDifficulty");
    mainDiff.value = currentDifficulty;
    settingsDiff.value = currentDifficulty;
    
    mainDiff.addEventListener("change", (e) => {
        currentDifficulty = e.target.value;
        settingsDiff.value = currentDifficulty;
        saveToLocalStorage();
    });
    settingsDiff.addEventListener("change", (e) => {
        currentDifficulty = e.target.value;
        mainDiff.value = currentDifficulty;
        saveToLocalStorage();
    });
}

// Сброс всего прогресса
function resetAllProgress() {
    if (confirm("ВНИМАНИЕ! Будут удалены: профиль, история, награды, серия. Отменить нельзя!")) {
        localStorage.clear();
        location.reload();
    }
}

//  НАВИГАЦИЯ 
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");
    
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const pageId = link.dataset.page;
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            pages.forEach(p => p.classList.remove("active"));
            document.getElementById(`page-${pageId}`).classList.add("active");
            
            if (pageId === "history") renderHistoryTable();
            if (pageId === "profile") {
                updateProfileUI();
                renderRewards();
            }
        });
    });
}

//  ИНИЦИАЛИЗАЦИЯ 
function init() {
    loadFromLocalStorage();
    
    // UI элементы
    document.getElementById("userName").addEventListener("input", (e) => {
        user.name = e.target.value || "Исследователь";
        saveToLocalStorage();
        updateProfileUI();
    });
    
    document.getElementById("getQuestBtn").addEventListener("click", generateQuests);
    document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);
    document.getElementById("resetAllBtn").addEventListener("click", resetAllProgress);
    document.getElementById("historyStatusFilter").addEventListener("change", () => renderHistoryTable());
    
    renderCategoryCheckboxes("mainCategories", true);
    renderCategoryCheckboxes("settingsCategories", true);
    
    syncSettings();
    initNavigation();
    
    updateProfileUI();
    renderRewards();
    renderHistoryTable();
}

// Запуск
init();