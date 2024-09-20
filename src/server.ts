import app from "./index";

const PORT: number = parseInt(process.env.PORT as string) || 4000;
app.listen(4000, (err?: any) => {
  if (err) {
    console.log(`Error While Listening : ${PORT}`);
  }
  console.log(`Server is up and Run on PORT : ${PORT}`);
});
