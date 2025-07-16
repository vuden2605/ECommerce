import { fetchUsers } from './adminService.js';
import { renderUsers } from './render.js';
document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();
  renderUsers(users);
});
