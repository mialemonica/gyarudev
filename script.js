const clicky = new Audio("sfx/click.mp3");

clicky.play();

var box = document.getElementById("box");
var bounds = document.getElementById("speedmeter2");
var coordx = document.getElementById("coordx");
var coordy = document.getElementById("coordy");

function drag(element) {
    var dragOffsetX = 0;
    var dragOffsetY = 0;

    element.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e) {
        e.preventDefault();

        var rect = element.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        document.addEventListener("mousemove", elementDrag);
        document.addEventListener("mouseup", close);
    }

    function elementDrag(e) {
        e.preventDefault();

        if (!bounds) return;

        var containerRect = bounds.getBoundingClientRect();
        var nextLeft = e.clientX - containerRect.left - dragOffsetX;
        var nextTop = e.clientY - containerRect.top - dragOffsetY;
        var maxLeft = containerRect.width - element.offsetWidth;
        var maxTop = containerRect.height - element.offsetHeight;

        nextLeft = Math.max(0, Math.min(nextLeft, maxLeft));
        nextTop = Math.max(0, Math.min(nextTop, maxTop));

        element.style.left = nextLeft + "px";
        element.style.top = nextTop + "px";
    }

    function close() {
        document.removeEventListener("mousemove", elementDrag);
        document.removeEventListener("mouseup", close);
    }
}

drag(box);