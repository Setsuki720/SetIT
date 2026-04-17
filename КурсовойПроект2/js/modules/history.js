import { questHistory } from './data.js';
import { saveToLocalStorage } from './storage.js';
import { updateProfileUI } from './profile.js';

export function updateHistoryRecordStatus(recordId, newStatus) {
    let recordIndex = -1;
    for (let i = 0; i < questHistory.length; i++) {
        if (questHistory[i].recordId === recordId) {
            recordIndex = i;
            break;
        }
    }
    
    if (recordIndex !== -1) {
        questHistory[recordIndex].status = newStatus;
        questHistory[recordIndex].date = new Date().toLocaleString();
        saveToLocalStorage();
        renderHistoryTable();
    }
}

export function renderHistoryTable() {
    const filterSelect = document.getElementById("historyStatusFilter");
    const filterValue = filterSelect ? filterSelect.value : "all";
    
    let filtered = [];
    for (let i = 0; i < questHistory.length; i++) {
        filtered.push(questHistory[i]);
    }
    
    if (filterValue !== "all") {
        const newFiltered = [];
        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i].status === filterValue) {
                newFiltered.push(filtered[i]);
            }
        }
        filtered = newFiltered;
    }
    
    // Сортировка по дате (новые сверху)
    for (let i = 0; i < filtered.length - 1; i++) {
        for (let j = 0; j < filtered.length - i - 1; j++) {
            const dateA = new Date(filtered[j].createdAt);
            const dateB = new Date(filtered[j + 1].createdAt);
            if (dateA < dateB) {
                const temp = filtered[j];
                filtered[j] = filtered[j + 1];
                filtered[j + 1] = temp;
            }
        }
    }
    
    const tbody = document.getElementById("historyBody");
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Нет записей</td></tr>';
        return;
    }
    
    let html = "";
    for (let i = 0; i < filtered.length; i++) {
        const h = filtered[i];
        let statusText = "";
        let statusClass = "";
        if (h.status === "pending") {
            statusText = "⏳ В ожидании";
            statusClass = "status-pending";
        } else if (h.status === "completed") {
            statusText = "✅ Выполнен";
            statusClass = "status-completed";
        } else {
            statusText = "⏭ Пропущен";
            statusClass = "status-skipped";
        }
        html += `
            <tr>
                <td>${h.title}</td>
                <td>${h.difficulty}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${h.date}</td>
            </tr>
        `;
    }
    tbody.innerHTML = html;
}

export function clearHistory() {
    if (confirm("Очистить всю историю квестов? Серия и награды сохранятся.")) {
        questHistory.length = 0;
        saveToLocalStorage();
        renderHistoryTable();
        updateProfileUI();
    }
}