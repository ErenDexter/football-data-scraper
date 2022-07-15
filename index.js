const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  axios
    .get("https://jdwel.com/today/", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
      },
    })
    .then(function (data) {
      const $ = cheerio.load(data.data);

      $(".submenu.row.justify-content-end").remove();
      $(".matches_datepicker").remove();

      const content = $(".matches_frame");
      //console.log(content.html());
      res.send(content.html());
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
