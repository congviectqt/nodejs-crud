(function () {
  const checkAll = document.querySelector(".checkAll");
  if (checkAll) {
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
  }
})();

function delCategory() {
  if (window.confirm("do you want to delete these items?")) {
    document.getElementById("listCategory").submit();
  }
}

//intergrated
tinymce.init({
  selector: ".editor-tinymce",
  height: 500,
  menubar: false,
  plugins: [
    "a11ychecker",
    "advlist",
    "advcode",
    "advtable",
    "autolink",
    "checklist",
    "export",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "powerpaste",
    "fullscreen",
    "formatpainter",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | casechange blocks | bold italic backcolor | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
});
