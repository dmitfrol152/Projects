const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors({
  origin: "https://audioplayer-self.netlify.app/",
  credentials: true,
}))
app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
