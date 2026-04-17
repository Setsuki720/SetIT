import { user, rewards, questHistory } from './data.js';
import { saveToLocalStorage } from './storage.js';

export function updateProfileUI() {
    const userNameEl = document.getElementById("userName");
    if (userNameEl) userNameEl.value = user.name;
    
    const regDateEl = document.getElementById("regDate");
    if (regDateEl) regDateEl.innerText = user.regDate;
    
    const currentStreakEl = document.getElementById("currentStreak");
    if (currentStreakEl) currentStreakEl.innerText = user.currentStreak;
    
    const totalRewardsEl = document.getElementById("totalRewards");
    if (totalRewardsEl) totalRewardsEl.innerText = rewards.length;
    
    const totalQuests = questHistory.length;
    let completedCount = 0;
    for (let i = 0; i < questHistory.length; i++) {
        if (questHistory[i].status === "completed") completedCount++;
    }
    const percent = totalQuests === 0 ? 0 : Math.round((completedCount / totalQuests) * 100);
    const percentEl = document.getElementById("completedPercent");
    if (percentEl) percentEl.innerText = percent;
    
    let level = "Новичок";
    if (rewards.length >= 7) level = "Мастер";
    else if (rewards.length >= 3) level = "Эксперт";
    else if (rewards.length >= 1) level = "Практик";
    const levelEl = document.getElementById("userLevel");
    if (levelEl) levelEl.innerText = level;
    
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) greetingEl.innerHTML = `👋 ${user.name}, выбери квест для роста!`;
}

export function renderRewards() {
    const container = document.getElementById("rewardsContainer");
    if (!container) return;
    
    if (rewards.length === 0) {
        container.innerHTML = '<div class="empty-state">Пока нет наград. Выполняйте серии 3, 5, 7 дней!</div>';
        return;
    }
    
    let html = "";
    for (let i = 0; i < rewards.length; i++) {
        html += `
            <div class="reward-badge">
                ⭐ ${rewards[i].name} <small>(${rewards[i].date})</small>
            </div>
        `;
    }
    container.innerHTML = html;
}

export function checkAndAwardStreak(newStreak) {
    const milestones = [3, 5, 7];
    for (let m = 0; m < milestones.length; m++) {
        const milestone = milestones[m];
        let alreadyHas = false;
        for (let i = 0; i < rewards.length; i++) {
            if (rewards[i].streakValue === milestone) {
                alreadyHas = true;
                break;
            }
        }
        
        if (newStreak === milestone && !alreadyHas) {
            const newReward = {
                id: Date.now() + milestone,
                name: `Серия ${milestone} дней!`,
                streakValue: milestone,
                date: new Date().toLocaleDateString()
            };
            rewards.push(newReward);
            saveToLocalStorage();
            renderRewards();
            updateProfileUI();
            alert(`🎉 ПОЗДРАВЛЯЕМ! Получена награда: "Серия ${milestone} дней"`);
        }
    }
}