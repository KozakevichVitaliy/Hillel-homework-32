const taksPlannedList = document.getElementById('tasks-planned');
const taksProgressList = document.getElementById('tasks-progress');
const taksDoneList = document.getElementById('tasks-done');

async function App() {
    const todosData = await getTodos();
    const filteredData = filterData(todosData);
    const { todosPlanned, todosProgress, todosDone } = filteredData;
    
    renderTodos(todosPlanned, taksPlannedList);
    renderTodos(todosProgress, taksProgressList);
    renderTodos(todosDone, taksDoneList);
    // renderDoneStatus()
}

async function getTodos() {
    try {
        const response = await fetch('https://6ace3a4af338359cf1c34b0b.mockapi.io/todos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Сталася помилка під час завантаження:", error);
    }
}

function filterData(data) {
    if (!data.length) return;

    const todosPlanned = [];
    const todosProgress = [];
    const todosDone = [];
    data.forEach((todo) => {
        switch (todo.status) {
            case 'planned':
                todosPlanned.push(todo)
                break;
            case 'progress':
                todosProgress.push(todo)
                break;
            case 'done':
                todosDone.push(todo)
                break;
            default:
                break;
        }
    });
    return {
        todosPlanned,
        todosProgress,
        todosDone
    }
}

function renderTodos(todosData, todosList) {
    const todoElements = todosData.map(({
        id,
        title,
        urgency,
        status,
        detail
    }) => {
        const card = `
            <li class="card" id=${id}>
                <div class="card__marker ${status}"></div>
                <div class="card__content">
                    <div class="card__header">
                        <span class="card__dot dot ${status}"></span>
                        <span class="card__marker-title">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </div>
                    <div class="card__primary">
                        <h5 class="card__title">${title}</h5>
                        <p class="card__text">${detail}</p>
                        <button class="card__tag tag">${urgency}</button>
                    </div>
                    <div class="card__control">
                        <button class="card__button button-delete">
                            Delete
                        </button>
                        <button class="card__button button-update">
                            Update
                        </button>
                    </div>
                </div>
            </li>
        `
        return card;
    });
    todosList.insertAdjacentHTML('beforeend', todoElements.join(','));
}

App()