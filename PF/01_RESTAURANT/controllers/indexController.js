const connection = require("../config/db");
const sha1 = require("sha1");

class IndexController {
  showHome = (req, res) => {
    res.render("index");
  };
}

module.exports = new IndexController();
