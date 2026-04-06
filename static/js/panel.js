document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const recordForm = document.getElementById('recordForm');
    const recordsList = document.getElementById('recordsList');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const showAllButton = document.getElementById('showAllButton');
    const alertMessage = document.getElementById('alertMessage');
    const submitButton = document.getElementById('submitButton');
    const cancelEditButton = document.getElementById('cancelEdit');
    const editIdField = document.getElementById('editId');
    
    // Load all records when page loads
    loadRecords();
    
    // Form submission handler
    recordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(recordForm);
        
        // Check if we're editing or adding
        const isEditing = editIdField.value !== '';
        const url = isEditing ? 'api.php?action=update' : 'api.php?action=create';
        
        // Send AJAX request
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert(data.message, 'success');
                recordForm.reset();
                loadRecords();
                
                // Reset form state if editing
                if (isEditing) {
                    submitButton.textContent = 'Add Record';
                    cancelEditButton.classList.add('hidden');
                    editIdField.value = '';
                }
            } else {
                showAlert(data.message, 'error');
            }
        })
        .catch(error => {
            showAlert('An error occurred while processing your request.', 'error');
            console.error('Error:', error);
        });
    });
    
    // Search button handler
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchRecords(searchTerm);
        } else {
            showAlert('Please enter a 4-digit code to search.', 'error');
        }
    });
    
    // Show all records button handler
    showAllButton.addEventListener('click', function() {
        searchInput.value = '';
        loadRecords();
    });
    
    // Cancel edit button handler
    cancelEditButton.addEventListener('click', function() {
        recordForm.reset();
        submitButton.textContent = 'Add Record';
        cancelEditButton.classList.add('hidden');
        editIdField.value = '';
    });
    
    // Function to load all records
    function loadRecords() {
        fetch('api.php?action=read')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayRecords(data.records);
                } else {
                    recordsList.innerHTML = '<tr><td colspan="6" class="text-center">No records found</td></tr>';
                }
            })
            .catch(error => {
                showAlert('Failed to load records.', 'error');
                console.error('Error:', error);
            });
    }
    
    // Function to search records
    function searchRecords(code) {
        fetch(`api.php?action=search&code=${code}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayRecords(data.records);
                    if (data.records.length === 0) {
                        showAlert('No records found with that code.', 'error');
                    }
                } else {
                    showAlert(data.message, 'error');
                    recordsList.innerHTML = '<tr><td colspan="6" class="text-center">No records found</td></tr>';
                }
            })
            .catch(error => {
                showAlert('Search failed.', 'error');
                console.error('Error:', error);
            });
    }
    
    // Function to display records in the table
    function displayRecords(records) {
        recordsList.innerHTML = '';
        
        if (records.length === 0) {
            recordsList.innerHTML = '<tr><td colspan="6" class="text-center">No records found</td></tr>';
            return;
        }
        
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.code}</td>
                <td>${record.name}</td>
                <td><a href="${record.drive_link}" target="_blank" class="drive-link">${record.drive_link}</a></td>
                <td>${record.level}</td>
                <td>${record.specialization}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${record.id}" data-code="${record.code}" data-name="${record.name}" 
                    data-link="${record.drive_link}" data-level="${record.level}" data-specialization="${record.specialization}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${record.id}">Delete</button>
                </td>
            `;
            recordsList.appendChild(row);
        });
        
        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const code = this.getAttribute('data-code');
                const name = this.getAttribute('data-name');
                const link = this.getAttribute('data-link');
                const level = this.getAttribute('data-level');
                const specialization = this.getAttribute('data-specialization');
                
                // Populate form with record data
                document.getElementById('code').value = code;
                document.getElementById('name').value = name;
                document.getElementById('driveLink').value = link;
                document.getElementById('level').value = level;
                document.getElementById('specialization').value = specialization;
                editIdField.value = id;
                
                // Change button text and show cancel button
                submitButton.textContent = 'Update Record';
                cancelEditButton.classList.remove('hidden');
                
                // Scroll to form
                document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const code = this.closest('tr').querySelector('td:first-child').textContent;
                
                if (confirm(`Are you sure you want to delete record with code ${code}?`)) {
                    deleteRecord(id);
                }
            });
        });
    }
    
    // Function to delete a record
    function deleteRecord(id) {
        const formData = new FormData();
        formData.append('id', id);
        
        fetch('api.php?action=delete', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert(data.message, 'success');
                loadRecords();
            } else {
                showAlert(data.message, 'error');
            }
        })
        .catch(error => {
            showAlert('Failed to delete record.', 'error');
            console.error('Error:', error);
        });
    }
    
    // Function to validate form
    function validateForm() {
        const code = document.getElementById('code').value.trim();
        const name = document.getElementById('name').value.trim();
        const driveLink = document.getElementById('driveLink').value.trim();
        const level = document.getElementById('level').value;
        const specialization = document.getElementById('specialization').value;
        
        // Check if all fields are filled
        if (!code || !name || !driveLink || !level || !specialization) {
            showAlert('All fields are required', 'error');
            return false;
        }
        
        // Validate code format (4 digits)
        if (!/^\d{4}$/.test(code)) {
            showAlert('Code must be exactly 4 digits', 'error');
            return false;
        }
        
        // Validate URL format
        if (!/^https?:\/\/.+/.test(driveLink)) {
            showAlert('Please enter a valid URL for the Google Drive link', 'error');
            return false;
        }
        
        return true;
    }
    
    // Function to show alert messages
    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = `alert ${type}`;
        
        // Hide alert after 5 seconds
        setTimeout(() => {
            alertMessage.classList.add('hidden');
        }, 5000);
    }
    
    // Add event listener for search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});