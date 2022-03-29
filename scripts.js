



spawnBlocksFromConfig();

// function spawnBlocks() {
//     for(var i = 0; config.myWatchface.length > i; i++) {
//         e.blockContainer.innerHTML += "[" + "(" + "x:" + config.myWatchface[i].x + " " + "y:" + config.myWatchface[i].y + ")" + config.myWatchface[i].inner + "]";
//     }
// }

// spawnBlocks();

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
        myBlock.style.top = myBlock.getAttribute("y");
        myBlock.style.left = myBlock.getAttribute("x");
    }
}



e.blockContainer.innerHTML = e.blockContainer.innerHTML.replaceAll("[","<div class='block'>");
e.blockContainer.innerHTML = e.blockContainer.innerHTML.replaceAll("]","</div>");

e.blocks = document.getElementsByClassName("block");


for(var i = 0; e.blocks.length > i; i++) {
    if(e.blocks[i].innerHTML.charAt(0) == "(") { // If has attributes
        var myAttributes = e.blocks[i].innerHTML.split("(")[1].split(")")[0]; // Extract attributes
        myAttributes = myAttributes.split(" "); // Put attributes into array

        for(var j = 0; myAttributes.length > j; j++) {
            e.blocks[i].setAttribute(myAttributes[j].split(":")[0], myAttributes[j].split(":")[1]); // Name : Value
        }

        e.blocks[i].innerHTML = e.blocks[i].innerHTML.replaceAll("(" + e.blocks[i].innerHTML.split("(")[1].split(")")[0] + ")", "");
    }
}



setBlockPositions();


function returnValue(which) {
    switch (which) {
        case "seconds":
            return time.getSeconds();

        default:
            return "default"
        }
}