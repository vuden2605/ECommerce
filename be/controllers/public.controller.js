const path = require('path');

module.exports = {
  getIndex: (req, res) => {
    res.sendFile(path.join(__dirname, '../../fe/index.html'));
  },
  getAdminPage: (req, res) => {
    res.sendFile(path.join(__dirname, '../../fe/admin.html'));
  }
};