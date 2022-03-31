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
