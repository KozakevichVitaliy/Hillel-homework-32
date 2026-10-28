const tasksLists = document.querySelector('.tasks__lists')

async function deleteTodo(id) {
    try {
        await fetch(`https://6ace3a4af338359cf1c34b0b.mockapi.io/todos/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error("Сталася помилка під час завантаження:", error);
    }
}