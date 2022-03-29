for(var i = 0; e.blocks.length > i; i++) {
    var myBlock = e.blocks[i];
    myBlock.innerHTML = document.getElementById("headbar").innerHTML + myBlock.innerHTML;
}