const tasksPlannedList = document.getElementById('tasks-planned');
const tasksProgressList = document.getElementById('tasks-progress');
const tasksDoneList = document.getElementById('tasks-done');
const tasksPlannedCounter = document.getElementById('planned-counter');
const tasksProgressCounter = document.getElementById('progress-counter');
const tasksDoneCounter = document.getElementById('done-counter');


async function App() {
    const todosData = await getTodos();
    const filteredData = filterData(todosData);
    const { tasksPlanned, tasksProgress, tasksDone } = filteredData;
    
    renderTasks(tasksPlanned, tasksPlannedList);
    renderTasks(tasksProgress, tasksProgressList);
    renderTasks(tasksDone, tasksDoneList);
    renderStatusCounters()
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

    const tasksPlanned = [];
    const tasksProgress = [];
    const tasksDone = [];
    data.forEach((task) => {
        switch (task.status) {
            case 'planned':
                tasksPlanned.push(task)
                break;
            case 'progress':
                tasksProgress.push(task)
                break;
            case 'done':
                tasksDone.push(task)
                break;
            default:
                break;
        }
    });
    return {
        tasksPlanned, 
        tasksProgress, 
        tasksDone 
    }
}

function renderStatusCounters() {
    tasksPlannedCounter.innerText = tasksPlannedList.children.length;
    tasksProgressCounter.innerText = tasksProgressList.children.length;
    tasksDoneCounter.innerText = tasksDoneList.children.length;
}

function renderTasks(todosData, todosList) {
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