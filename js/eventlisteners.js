function initEventListeners() {
    if(!config.edit_mode) {
        for(myBlock of e.blocks) {
            myBlock.addEventListener("mouseover", function() {
                selectBlock(this);
            });
            myBlock.addEventListener("mouseout", function() {
                selectBlock();
            });
        }
    }
}

function initEventListeners_edit() {
    document.addEventListener("mousemove", function(event) {
        session.mouseX = event.clientX;
        session.mouseY = event.clientY;
        dragBlock(session.selectedBlock);
    });
    
    document.addEventListener("mouseup", function(event) {
        session.mouseDown = false;
        dragBlock(session.selectedBlock);
    })
}
