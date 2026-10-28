async function postUpdateTodo(metod, data, id) {
    try {
        await fetch(`https://6ace3a4af338359cf1c34b0b.mockapi.io/todos/${id ? id: ''}`, {
            method: metod,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Сталася помилка під час завантаження:", error);
    }
}