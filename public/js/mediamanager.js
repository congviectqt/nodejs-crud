(function () {
  //Call modal bootstrap
  var myModalEl = document.getElementById("exampleModal");
  if (myModalEl) {
    const extImg = [
      "png",
      "jpg",
      "gif",
      "ai",
      "pdf",
      "eps",
      "raw",
      "jpeg",
      "tiff",
    ];
    const extDoc = ["docx", "doc", "txt", "xlsx", "csv"];
    let str = ``;
    myModalEl.addEventListener("show.bs.modal", function (event) {
      fetch("http://localhost:5000/folder")
        .then((response) => response.json())
        .then((data) => {
          data.files.forEach((file) => {
            console.log(file);
            console.log(`ext image file`, checkExtFile(file));
            if (extImg.includes(checkExtFile(file))) {
              str += `<div class="media-item-img"><img src="./media/${file}" /></div>`;
            }
            // else if (extDoc.includes(checkExtFile(file))) {
            //   str += `<div class="media-item-img"><a href="${file}"><i class="fa-light fa-file"></i></a></div>`;
            // }
          });
          let $ = document.querySelector("#media-content");
          $.insertAdjacentHTML("afterbegin", str);
        });
    });

    myModalEl.addEventListener("hide.bs.modal", function (event) {
      str = ``;
      document.querySelector("#media-content").innerHTML = "";
      console.log(`helllllo close modal event`);
    });
  }

  function checkExtFile(file) {
    return file.split(".").pop();
  }

  function showImage() {}
})();
