// const pool = require('../utils/pool');

// module.exports = class User {
//   userId;
//   displayName;
//   email;
//   userToken;

//   constructor(row) {
//     this.id = row.id;
//     this.displayName = row.display_name;
//     this.email = row.email;
//     this.userToken = row.user_token;
//   }

//   static async insert(user) {
//     const { rows } = await pool.query(
//       'INSERT INTO users (display_name, email, userToken) VALUES ($1, $2, $3) RETURNING *',
//       [user.displayName, user.email, user.userToken]
//     );
//   }
// };
