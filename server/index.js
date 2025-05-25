app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = 1337;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});