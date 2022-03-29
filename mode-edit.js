session.mode = "edit";

for(var i = 0; e.blocks.length > i; i++) {
    var myBlock = e.blocks[i];
    myBlock.innerHTML = document.getElementById("headbar").innerHTML + myBlock.innerHTML;
    myBlock.getElementsByClassName("move")[0].addEventListener("mousedown", function(event) {
        session.mouseDown = true;
        session.mouseDownOn = event.srcElement;
        myMovingBlockOffsetX = event.layerX;
        myMovingBlockOffsetY = event.layerY;
        moveBlock();
        event.preventDefault();
    });

    myBlock.addEventListener("mousedown", function() {
        selectBlock(this.id);
    });
}

function selectBlock(which) {
    session.selectedBlock = which;
    for(var i = 0; document.getElementsByClassName("selected").length > i; i++) {
        document.getElementsByClassName("selected")[document.getElementsByClassName("selected").length - 1].classList.remove("selected");
    }
    document.getElementById(which).classList.add("selected");
}

function tickEdit() {
    e.mousepos.style.top = session.mouseY + "px";
    e.mousepos.style.left = session.mouseX + "px";
}

function initEdit() {
    e.mousepos = document.getElementById("mousepos");
    e.moveoverlay = document.getElementById("moveoverlay");
}

initEdit();

var myMovingBlockOffsetX;
var myMovingBlockOffsetY;

document.addEventListener("mousemove", function(event) {
    session.mouseX = event.clientX;
    session.mouseY = event.clientY;
    moveBlock();
});

document.addEventListener("mouseup", function(event) {
    session.mouseDown = false;
    moveBlock();
})


function moveBlock() {
    if(session.mouseDown) {
        document.body.classList.add("mousedown");
        if(session.mouseDownOn && session.mouseDownOn.parentElement.parentElement && session.mouseDownOn.parentElement.parentElement.classList.contains("selected")) {
            var myMovingBlock = session.mouseDownOn.parentElement.parentElement;
            config.myWatchface[myMovingBlock.id - 1].x = (session.mouseX - myMovingBlockOffsetX) + "px";
            config.myWatchface[myMovingBlock.id - 1].y = (session.mouseY - myMovingBlockOffsetY + session.one_rem) + "px";
            myMovingBlock.style.left = config.myWatchface[myMovingBlock.id - 1].x;
            myMovingBlock.style.top = config.myWatchface[myMovingBlock.id - 1].y;
            saveConfig();
        }
    } else {
        document.body.classList.remove("mousedown");
    }
}