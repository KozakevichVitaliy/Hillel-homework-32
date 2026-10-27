const form = document.getElementById('new-task');

async function postTodo(todo) {
    try {
        await fetch('https://6ace3a4af338359cf1c34b0b.mockapi.io/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    } catch (error) {
        console.error("Сталася помилка під час завантаження:", error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    await postTodo(data) 
    form.reset();
});
