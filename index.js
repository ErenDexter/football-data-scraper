const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.get("/football/schedule", (req, res) => {
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

      // $(".menu-section.main-nav.header-nav").remove();
      // $(".widget_albatrteblist.container-wrapper").remove();
      // $(".widget_categories.Alba-widget-categories.container-wrapper").remove();
      // $(".sidebar.is-sticky").remove();
      // $(".container-wrapper").remove();
      // $(".lnfo").remove();
      // $("#footer").remove();
      // $(".grid-container").remove();
      // $("#fixedban > div > div:nth-child(4)").remove();
      // $("#Today > div.albaflex").wrapAll(
      //   '<div style="pointer-events: none;"></div>'
      // );
      // $("#Tomorrow > div.albaflex").wrapAll(
      //   '<div style="pointer-events: none;"></div>'
      // );

      fs.readFile("schedule.php", (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          const $$ = cheerio.load(data);
          $(".AlbaTableTitle").remove();
          $$($(".AlbaSposrTable-sc").html()).appendTo(".AlbaSposrTable-sc");
          $$("#Today > div.albaflex").wrapAll(
            '<div style="pointer-events: none;"></div>'
          );
          $$("#Tomorrow > div.albaflex").wrapAll(
            '<div style="pointer-events: none;"></div>'
          );
          res.send($$.html());
        }
      });
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
