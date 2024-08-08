document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const taskForm = document.getElementById('task-form');
    const documentForm = document.getElementById('document-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskAdd);
        loadTasks();
    }

    if (documentForm) {
        documentForm.addEventListener('submit', handleDocumentSave);
        loadDocuments();
    }
});

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        window.location.href = 'tasks.html';
    } else {
        alert('Invalid login');
    }
}

function handleTaskAdd(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task').value;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskInput);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    event.target.reset();
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    if (taskList) {
        taskList.innerHTML = '';
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
        });
    }
}

function handleDocumentSave(event) {
    event.preventDefault();
    const title = document.getElementById('document-title').value;
    const content = document.getElementById('document-content').value;
    let documents = JSON.parse(localStorage.getItem('documents')) || [];
    documents.push({ title, content });
    localStorage.setItem('documents', JSON.stringify(documents));
    loadDocuments();
    event.target.reset();
}

function loadDocuments() {
    const documentList = document.getElementById('document-list');
    if (documentList) {
        documentList.innerHTML = '';
        let documents = JSON.parse(localStorage.getItem('documents')) || [];
        documents.forEach(doc => {
            let li = document.createElement('li');
            li.textContent = `${doc.title}: ${doc.content}`;
            documentList.appendChild(li);
        });
    }
}
