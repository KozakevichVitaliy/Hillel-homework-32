const addTaskBtn = document.querySelector('.toolbar__button.button-add');

addTaskBtn.addEventListener('click', () => window.location.href = 'task-new.html')
tasksLists.addEventListener('click', (e) => {
    if(e.target.classList.contains('button-update')) { 
        const { id, title, urgency, status, detail } = todosData.find((task) => task.id === e.target.closest('li').id)
        const targetUrl = `
            task-new.html?title=${encodeURIComponent(title)}&urgency=${encodeURIComponent(urgency)}&status=${encodeURIComponent(status)}&detail=${encodeURIComponent(detail)}&id=${encodeURIComponent(id)}
        `;
        window.location.href = targetUrl;
    }
    if(e.target.classList.contains('button-delete')) { 
        e.target.closest('li').remove();
        renderStatusCounters()
        deleteTodo(e.target.closest('li').id);
    }
});