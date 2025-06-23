document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('Nombre');
    const dueDateInput = document.getElementById('Date');
    const descriptionInput = document.getElementById('Descripción');
    const taskListUl = document.getElementById('taskList');
    
    const errorNameSpan = document.getElementById('errorNombre');
    const errorDateSpan = document.getElementById('errorDate');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        errorNameSpan.textContent = '';
        errorDateSpan.textContent = '';
        
        let isValid = true;

        if (taskNameInput.value.trim() === '') {
            errorNameSpan.textContent = 'El nombre es obligatorio.';
            isValid = false;
        } else if (taskNameInput.value.trim().length > 25) {
            errorNameSpan.textContent = 'Máximo 25 caracteres.';
            isValid = false;
        }

        if (dueDateInput.value.trim() === '') {
            errorDateSpan.textContent = 'La fecha es obligatoria.';
            isValid = false;
        }

        if (!isValid) {
            return; 
        }

        const newTask = {
            name: taskNameInput.value.trim(),
            dueDate: dueDateInput.value,
            description: descriptionInput.value.trim() 
        };

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item'); 

        const dateObj = new Date(newTask.dueDate + 'T00:00:00'); 
        const formattedDueDate = dateObj.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        taskItem.innerHTML = `
            <h3>${newTask.name}</h3>
            <p><strong>Fecha:</strong> ${formattedDueDate}</p>
            <p><strong>Desc:</strong> ${newTask.description || 'Sin descripción'}</p>
        `;

        
        const existingNoTasksMessage = taskListUl.querySelector('p.error-message');
        if (existingNoTasksMessage) {
            existingNoTasksMessage.remove(); 
        }

        taskListUl.appendChild(taskItem);
        taskForm.reset();
        
    });
});