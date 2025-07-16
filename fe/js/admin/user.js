import { fetchUsers } from './adminService.js';
import { renderUsers } from './eventHandle.js';
document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();
  renderUsers(users);
});
