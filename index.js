const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  axios
    .get("https://www.as-goal.com/mm/", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
      },
    })
    .then(function (data) {
      const $ = cheerio.load(data.data);

      $(".menu-section.main-nav.header-nav").remove();
      $(".widget_albatrteblist.container-wrapper").remove();
      $(".widget_categories.Alba-widget-categories.container-wrapper").remove();
      $(".sidebar.is-sticky").remove();
      $(".container-wrapper").remove();
      $(".lnfo").remove();
      $("#footer").remove();
      //$(".matches_datepicker").remove();

      //const content = $(".matches_frame");
      //console.log(content.html());
      res.send($.html());
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
