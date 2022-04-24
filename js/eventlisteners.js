function initEventListeners() {
    /**
    * Initializes Event Listeners
    */
    // TODO: Move all event listeners in here
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
