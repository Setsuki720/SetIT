import { user, questHistory, rewards, currentDifficulty, selectedCategories, setUser, setQuestHistory, setRewards, setCurrentDifficulty, setSelectedCategories, getAllCategories, initCategories } from './data.js';

export function saveToLocalStorage() {
    localStorage.setItem("quest_user", JSON.stringify(user));
    localStorage.setItem("quest_history", JSON.stringify(questHistory));
    localStorage.setItem("quest_rewards", JSON.stringify(rewards));
    localStorage.setItem("quest_settings", JSON.stringify({
        difficulty: currentDifficulty,
        categories: selectedCategories
    }));
}

export function loadFromLocalStorage() {
    const savedUser = localStorage.getItem("quest_user");
    if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
    } else {
        setUser({
            name: "Путник",
            regDate: new Date().toLocaleDateString(),
            currentStreak: 0
        });
    }
    
    const savedHistory = localStorage.getItem("quest_history");
    if (savedHistory) {
        setQuestHistory(JSON.parse(savedHistory));
    }
    
    const savedRewards = localStorage.getItem("quest_rewards");
    if (savedRewards) {
        setRewards(JSON.parse(savedRewards));
    }
    
    const savedSettings = localStorage.getItem("quest_settings");
    if (savedSettings) {
        const set = JSON.parse(savedSettings);
        setCurrentDifficulty(set.difficulty || "all");
        setSelectedCategories(set.categories || getAllCategories());
    } else {
        initCategories();
    }
}

export function resetAllProgress() {
    if (confirm("ВНИМАНИЕ! Будут удалены: профиль, история, награды, серия. Отменить нельзя!")) {
        localStorage.clear();
        location.reload();
    }
}