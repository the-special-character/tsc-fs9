const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkbox);

checkbox();

function checkbox() {
  const triggerBottom = window.innerHeight;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
