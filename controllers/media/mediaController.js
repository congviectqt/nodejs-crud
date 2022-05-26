const { render } = require("ejs");
const fs = require("fs");
const path = require("path");
const directory = "./public/media/";

const showList = (req, res) => {
  let folders = [];
  let files = [];
  const items = fs.readdirSync(directory).map((file) => {
    if (fs.lstatSync(path.resolve(directory, file)).isDirectory()) {
      return folders.push(file);
    } else {
      return files.push(file);
    }
  });
  res.render("media/main", {
    files: files,
    folders: folders,
  });
};

module.exports = {
  showList,
};
