import express from "express";
import { mysqlPool as db } from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

// app.get("/api", (req, res) => {
//   res.send("Hello world");
// });

app.use(express.json());

app.get("/api", async (req, res) => {
  try {
    const ticker = req.query.ticker;
    const columns = req.query.column ? req.query.column.split(",") : [];

    const columnsQuery = columns.length ? columns.join(",") : "*";

    let periodQuery = "";

    if (req.query.period) {
      const period = req.query.period.slice(0, -1);
      const startYear = 2023 - parseInt(period) + 1;
      periodQuery = ` AND date >= '1/1/${startYear}' AND date <= '12/31/2023'`;
    }

    const query = `SELECT ${columnsQuery} FROM businessquants.sample WHERE ticker='${ticker}'${periodQuery}`;
    try {
      const result = await db.query(query);
      res.status(200).json(result[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Database query error" });
    }
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
