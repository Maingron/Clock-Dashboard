function spawnBlocksFromConfig() {
    for(var i = 0; config.myWatchface.length > i; i++) {
        spawnBlock(config.myWatchface[i]);
    }
}

function spawnBlock(attributes) {
    var myNewElement = document.createElement("div");
    for(var i = 0; Object.keys(attributes).length > i; i++) {
        myNewElement.setAttribute(Object.keys(attributes)[i], attributes[Object.keys(attributes)[i]])
    }
    myNewElement.classList.add("block");
    myNewElement.innerHTML = "<content></content>";
    session.blocknr++;
    myNewElement.id = session.blocknr;
    e.blockContainer.append(myNewElement);
}


function setBlockPositions() {
    for(var i = 0; e.blocks.length > i; i++) {
        var myBlock = e.blocks[i];
        myBlock.style.top = config.myWatchface[i].y;
        myBlock.style.left = config.myWatchface[i].x;
    }
}

function registerTicker(which) {
    tickFunctionArray.push(which);
}