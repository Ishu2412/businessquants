import mysql from "mysql2/promise";

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Aliza",
  database: "businessquants",
});

export { mysqlPool };

// try {
//   const ans = await db.query("SELECT * FROM businessquants.sample");
//   console.log(ans[0]);
// } catch (err) {
//   console.log(`Error message ${err.message}`);
// }
