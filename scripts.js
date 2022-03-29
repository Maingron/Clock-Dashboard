var elements = element = e = {
    "blockContainer": document.getElementById("block-container"),
    "results": document.getElementById("results")
}

var config = {
    "tps": "5"
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

function setBlockPositions() {
    for(var i = 0; e.blocks.length > i; i++) {
        var myBlock = e.blocks[i];
        myBlock.style.top = myBlock.getAttribute("y");
        myBlock.style.left = myBlock.getAttribute("x");
    }
}

setBlockPositions();