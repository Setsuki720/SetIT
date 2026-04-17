//  БАЗА КВЕСТОВ 
export const QUESTS_DB = [
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

// ГЛОБАЛЬНЫЕ ДАННЫЕ 
export let user = {
    name: "Путник",
    regDate: new Date().toLocaleDateString(),
    currentStreak: 0
};

export let questHistory = [];
export let rewards = [];
export let currentQuests = [];
export let currentDifficulty = "all";
export let selectedCategories = [];

// Функции для обновления глобальных данных
export function setUser(newUser) {
    user.name = newUser.name;
    user.regDate = newUser.regDate;
    user.currentStreak = newUser.currentStreak;
}

export function setQuestHistory(newHistory) {
    questHistory.length = 0;
    questHistory.push(...newHistory);
}

export function setRewards(newRewards) {
    rewards.length = 0;
    rewards.push(...newRewards);
}

export function setCurrentQuests(newQuests) {
    currentQuests.length = 0;
    currentQuests.push(...newQuests);
}

export function setCurrentDifficulty(difficulty) {
    currentDifficulty = difficulty;
}

export function setSelectedCategories(categories) {
    selectedCategories.length = 0;
    selectedCategories.push(...categories);
}

// Вспомогательная функция
export function getAllCategories() {
    const categories = [];
    for (let i = 0; i < QUESTS_DB.length; i++) {
        const cat = QUESTS_DB[i].category;
        let found = false;
        for (let j = 0; j < categories.length; j++) {
            if (categories[j] === cat) {
                found = true;
                break;
            }
        }
        if (!found) {
            categories.push(cat);
        }
    }
    return categories;
}

export function initCategories() {
    const allCats = getAllCategories();
    setSelectedCategories(allCats);
}