const clicky = new Audio("sfx/click.mp3");

clicky.play();

var box = document.getElementById("box");
var innerBox = document.querySelector(".box2");
var bounds = document.getElementById("speedmeter2");
var coordx = document.querySelector(".coordx p");
var coordy = document.querySelector(".coordy p");



function colorFromWave(x) {
    var y = 252 / (Math.pow(Math.abs(5), 5 * Math.sin(0.015 * x + 0.5)) + 1) - 1.5;
    var red = Math.round(Math.max(0, Math.min(255, y * 10)));

    return "rgb(" + red + ", 0, 0)";
}

function updateInnerBoxColor(left) {
    if (!innerBox) return;

    innerBox.style.backgroundColor = colorFromWave(left);
}

function drag(element) {
    var dragOffsetX = 0;
    var dragOffsetY = 0;

    element.addEventListener("mousedown", dragMouseDown);

    element.addEventListener("touchstart", dragTouchDown);

    function dragMouseDown(e) {
        e.preventDefault();

        var rect = element.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        document.addEventListener("mousemove", elementDrag);
        document.addEventListener("mouseup", close);
    }

    function dragTouchDown(e) {
        e.preventDefault();
        var touch = e.touches[0];
        var rect = element.getBoundingClientRect();
        dragOffsetX = touch.clientX - rect.left - (bounds.getBoundingClientRect().left / 2);
        dragOffsetY = touch.clientY - rect.top - (bounds.getBoundingClientRect().top / 2);
        document.addEventListener("touchmove", elementDrag);
        document.addEventListener("touchend", close);
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

        updateInnerBoxColor(
            nextLeft,
            nextTop,
            containerRect.width - element.offsetWidth,
            containerRect.height - element.offsetHeight
        );

        var centeredX = nextLeft - (containerRect.width / 2);
        var centeredY = nextTop - (containerRect.height / 2);

        if (coordx) coordx.textContent = "X: " + (Math.round(centeredX) + 10);
        if (coordy) coordy.textContent = "Y: " + (Math.round(centeredY) + 10);

    }

    function close() {
        document.removeEventListener("mousemove", elementDrag);
        document.removeEventListener("mouseup", close);
        document.removeEventListener("touchmove", elementDrag);
        document.removeEventListener("touchend", close);
    }
}

drag(box);