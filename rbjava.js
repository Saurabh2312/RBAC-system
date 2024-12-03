document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const roleList = document.getElementById("role-list");
    const roleDropdown = document.getElementById("user-role");
    const alertBox = document.getElementById("alert");
    
    const users = [];
    const roles = [];

    function showAlert(message, type) {
        alertBox.innerHTML = `<div class="alert ${type}">${message}</div>`;
        setTimeout(() => {
            alertBox.innerHTML = "";
        }, 3000);
    }

    function renderUsers() {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            userList.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.role || "Not Assigned"}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="btn primary" onclick="changeStatus(${index})">${user.status === "Active" ? "Deactivate" : "Activate"}</button>
                        <button class="btn" onclick="deleteUser(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }

    function renderRoles() {
        roleList.innerHTML = "";
        roleDropdown.innerHTML = `<option value="" disabled selected>Select Role</option>`;
        roles.forEach((role, index) => {
            roleList.innerHTML += `
                <tr>
                    <td>${role}</td>
                    <td>
                        <button class="btn" onclick="deleteRole(${index})">Delete</button>
                    </td>
                </tr>
            `;
            roleDropdown.innerHTML += `<option value="${role}">${role}</option>`;
        });
    }

    // Add User
    document.getElementById("add-user").addEventListener("click", () => {
        const userName = document.getElementById("user-name").value;
        const userRole = document.getElementById("user-role").value;
        if (!userName) {
            showAlert("User name cannot be empty!", "error");
            return;
        }
        users.push({ name: userName, role: userRole || "Not Assigned", status: "Active" });
        renderUsers();
        document.getElementById("user-name").value = "";
        showAlert("User added successfully!", "success");
    });

    // Add Role
    document.getElementById("add-role").addEventListener("click", () => {
        const roleName = document.getElementById("role-name").value;
        if (!roleName) {
            showAlert("Role name cannot be empty!", "error");
            return;
        }
        if (roles.includes(roleName)) {
            showAlert("Role already exists!", "error");
            return;
        }
        roles.push(roleName);
        renderRoles();
        document.getElementById("role-name").value = "";
        showAlert("Role added successfully!", "success");
    });

    // Change User Status
    window.changeStatus = function(index) {
        users[index].status = users[index].status === "Active" ? "Inactive" : "Active";
        renderUsers();
        showAlert("User status updated!", "success");
    };

    // Delete User
    window.deleteUser = function(index) {
        users.splice(index, 1);
        renderUsers();
        showAlert("User deleted!", "success");
    };

    // Delete Role
    window.deleteRole = function(index) {
        const roleToDelete = roles[index];
        const assignedUsers = users.filter(user => user.role === roleToDelete);
        if (assignedUsers.length > 0) {
            showAlert("Cannot delete role assigned to users!", "error");
            return;
        }
        roles.splice(index, 1);
        renderRoles();
        showAlert("Role deleted!", "success");
    };

    // Search Functionality
    document.getElementById("search").addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query) || (user.role && user.role.toLowerCase().includes(query)));
        const filteredRoles = roles.filter(role => role.toLowerCase().includes(query));

        userList.innerHTML = "";
        filteredUsers.forEach((user, index) => {
            userList.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.role || "Not Assigned"}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="btn primary" onclick="changeStatus(${index})">${user.status === "Active" ? "Deactivate" : "Activate"}</button>
                        <button class="btn" onclick="deleteUser(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });

        roleList.innerHTML = "";
        filteredRoles.forEach((role, index) => {
            roleList.innerHTML += `
                <tr>
                    <td>${role}</td>
                    <td>
                        <button class="btn" onclick="deleteRole(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
    });

    // Initial Render
    renderUsers();
    renderRoles();
});
