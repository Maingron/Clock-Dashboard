var myMovingBlockOffsetX;
var myMovingBlockOffsetY;

for(myBlock of e.blocks) {
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

initEdit();