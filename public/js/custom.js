(function () {
  const checkAll = document.querySelector(".checkAll");
  checkAll.addEventListener("click", function () {
    const items = document.querySelectorAll(".item");
    if (checkAll.checked == false) {
      for (let i = 0; i < items.length; i++) {
        items[i].checked = false;
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        console.log("xxx", items[i].checked);
        if (items[i].checked === false) {
          items[i].checked = true;
        }
      }
    }
  });

  //
})();

function delCategory() {
  if (window.confirm("do you want to delete these items?")) {
    document.getElementById("listCategory").submit();
  }
}
