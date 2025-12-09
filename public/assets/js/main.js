// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    setupTaskCheckboxes();
    setupDeleteButtons();
    setupTaskModal();
});

// Setup checkbox functionality for existing tasks
function setupTaskCheckboxes() {
    const checkboxes = document.querySelectorAll('.form-check-input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.opacity = '0.6';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.opacity = '1';
                }
            });
        }
    });
}

// Setup delete buttons for existing tasks
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                this.closest('li').remove();
            }
        });
    });
}

// Setup task creation modal
function setupTaskModal() {
    const createTaskBtn = document.getElementById('createTaskBtn');
    const taskTitle = document.getElementById('taskTitle');
    
    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', function() {
            const title = taskTitle.value;
            const description = document.getElementById('taskDescription').value;
            const statusSelect = document.getElementById('taskStatus');
            const status = statusSelect.value;
            const badgeClass = statusSelect.options[statusSelect.selectedIndex].getAttribute('data-class');
            
            if (!title.trim()) {
                alert('Please enter a task title');
                return;
            }
            
            // Create new task list item
            const tasksList = document.getElementById('tasksList');
            const taskId = 'task_' + Date.now();
            const newTask = document.createElement('li');
            newTask.className = 'list-group-item py-3 d-flex justify-content-between align-items-center';
            
            newTask.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="${taskId}">
                    <label class="form-check-label" for="${taskId}">
                        <div>${title}</div>
                        ${description ? `<small class="text-muted d-block">${description}</small>` : ''}
                    </label>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge ${badgeClass} text-white">${status}</span>
                    <button class="btn btn-sm btn-outline-danger delete-task" title="Delete task">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            
            // Add to top of tasks list
            tasksList.insertBefore(newTask, tasksList.firstChild);
            
            // Add delete functionality
            newTask.querySelector('.delete-task').addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this task?')) {
                    newTask.remove();
                }
            });
            
            // Add checkbox functionality to strike through
            const checkbox = newTask.querySelector(`#${taskId}`);
            const label = newTask.querySelector(`label[for="${taskId}"]`);
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.opacity = '0.6';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.opacity = '1';
                }
            });
            
            // Clear form
            taskTitle.value = '';
            document.getElementById('taskDescription').value = '';
            statusSelect.selectedIndex = 0;
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('newTaskModal'));
            modal.hide();
            
            // Show success message
            showSuccessAlert(`Task "${title}" has been created.`);
        });
    }
    
    // Allow Enter key to submit in task title field
    if (taskTitle) {
        taskTitle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                createTaskBtn.click();
            }
        });
    }
}

// Helper function to show success alerts
function showSuccessAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <strong>Success!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Initialize the trends chart
function initializeChart() {
    const ctx = document.getElementById('trendsChart');
    
    if (!ctx) return;
    
    const gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, 'rgba(66, 133, 244, 0.3)');
    gradient1.addColorStop(1, 'rgba(66, 133, 244, 0.0)');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
            datasets: [{
                label: 'Today',
                data: [10, 8, 18, 20, 18, 42, 35, 22, 18, 32, 28, 12, 32, 18, 22, 20, 45, 48, 38, 28, 35, 25, 18],
                borderColor: 'rgb(66, 133, 244)',
                backgroundColor: gradient1,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgb(66, 133, 244)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'Yesterday',
                data: [8, 12, 15, 28, 32, 38, 30, 25, 18, 22, 28, 35, 30, 25, 22, 28, 25, 20, 18, 15, 12, 10, 8],
                borderColor: 'rgb(189, 189, 189)',
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: 'rgb(189, 189, 189)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(66, 133, 244, 0.5)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 60,
                    ticks: {
                        stepSize: 10,
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: '#666'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    // Button functionality to toggle between Today and Yesterday
    const todayBtn = document.getElementById('todayBtn');
    const yesterdayBtn = document.getElementById('yesterdayBtn');
    
    if (todayBtn && yesterdayBtn) {
        todayBtn.addEventListener('click', function() {
            chart.data.datasets[0].hidden = false;
            chart.data.datasets[1].hidden = true;
            chart.update();
            
            todayBtn.classList.remove('btn-outline-secondary');
            todayBtn.classList.add('btn-primary');
            yesterdayBtn.classList.remove('btn-primary');
            yesterdayBtn.classList.add('btn-outline-secondary');
        });
        
        yesterdayBtn.addEventListener('click', function() {
            chart.data.datasets[0].hidden = true;
            chart.data.datasets[1].hidden = false;
            chart.update();
            
            yesterdayBtn.classList.remove('btn-outline-secondary');
            yesterdayBtn.classList.add('btn-primary');
            todayBtn.classList.remove('btn-primary');
            todayBtn.classList.add('btn-outline-secondary');
        });
    }
}