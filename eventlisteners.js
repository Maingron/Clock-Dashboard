function initEventListeners() {
}

function initEventListeners_edit() {
    document.addEventListener("mousemove", function(event) {
        session.mouseX = event.clientX;
        session.mouseY = event.clientY;
        moveBlock();
    });
    
    document.addEventListener("mouseup", function(event) {
        session.mouseDown = false;
        moveBlock();
    })
}