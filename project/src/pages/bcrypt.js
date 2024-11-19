const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash('your_password_here', 10);
