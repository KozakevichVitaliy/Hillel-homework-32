const form = document.getElementById('new-task');
const formTitle = document.querySelector('.form__title');
const addTaskBtn = document.querySelector('.form__button.button-add');const cancelTaskBtn = document.querySelector('.form__button.button-cancel');


function modifyFormLayout(title) {
    addTaskBtn.innerText = 'Update Task'
    formTitle.innerText = ` Update '${title}' task`
}

function modifyUrlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.size) return;
    const data = { id: '', title: '', urgency: '', status: '', detail: '' };
    Object.keys(data).forEach(key => {
        data[key] = urlParams.get(key);
    })
    modifyFormLayout(data.title)
    return data;
}

function fillForm(data) {
    if (!data) return;
    Object.keys(data).forEach(key => {
        const formInput = document.querySelector(`[name="${key}"]`);
        if (formInput) formInput.value = data[key];
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    const data = modifyUrlParams();
    const modifiedFormData = Object.fromEntries(formData.entries());
    let method = 'POST';
    let id;

    if (data) {
        method = 'PUT'
        id = data.id
    }

    await postUpdateTodo(method, modifiedFormData, id)
    if (id) window.location.href = '/'; 
    form.reset();
});
cancelTaskBtn.addEventListener('click', () => window.location.href = 'https://kozakevichvitaliy.github.io/Hillel-homework-32/')

fillForm(modifyUrlParams())
