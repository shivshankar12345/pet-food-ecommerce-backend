import "./config/config";
import app from "./index";
import "reflect-metadata";
import { connectToDb } from "./db/data-source";

const PORT: number = parseInt(process.env.PORT as string) || 4000;
app.listen(PORT, (err?: any) => {
  if (err) {
    console.log(`Error While Listening : ${PORT}`);
  }
  console.log(`Server is up and Run on PORT : ${PORT}`);
  connectToDb();
});
