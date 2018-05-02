let neuralNetwork = new NeuralNetwork(input_x_hidden_weights, hidden_x_output_weights);
let outputChart  = new OutputChart();

let drawingCanvas =  document.getElementById('input-canvas');
drawingCanvas.width= 84;
drawingCanvas.height= 84;
let drawingContext = drawingCanvas.getContext('2d');
drawingContext.linewidth  = 10;

let feedCanvas = document.getElementById('feed-image');
feedCanvas.width= 28;
feedCanvas.height= 28;
let feedContext = feedCanvas.getContext('2d');


function getMousePos(evt) {
    var rect = drawingCanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
var mouseIsDown = false;
drawingCanvas.onmousedown =  ev => {
    mouseIsDown = true;
}
 
drawingCanvas.onmouseup =  ev => {
    mouseIsDown = false;
}
drawingCanvas.onmousemove = e => {
    if(!mouseIsDown) return;

    drawingContext.beginPath();
    drawingContext.arc(getMousePos(e).x, getMousePos(e).y, 3, 0, 2 * Math.PI, false);
    drawingContext.fillStyle = '#ffffff';
    drawingContext.fill();

    return false;
}
drawingCanvas.addEventListener('mouseout', function(){
    mouseIsDown = false;
}, false);

document.getElementById('recognise-button').onclick = function(){
    feedContext.drawImage(drawingCanvas, 0, 0, feedCanvas.width, feedCanvas.height);
    let rgbaArray = feedContext.getImageData(0, 0, feedCanvas.width, feedCanvas.height).data;
    let pixels = [];
    for(let i = 3; i<rgbaArray.length; i = i + 4)
        pixels.push(rgbaArray[i]);
    let output = neuralNetwork.query(pixels)._data;
    outputChart.plot(output)
    var ss = '0';
    if(output.indexOf(Math.max(...output)) == 0){
        var ss = '፩';
    }
    if(output.indexOf(Math.max(...output)) == 1){
        var ss = '፪';
    }
    if(output.indexOf(Math.max(...output)) == 2){
        var ss = '፫';
    }
    if(output.indexOf(Math.max(...output)) == 3){
        var ss = '፬';
    }
    if(output.indexOf(Math.max(...output)) == 4){
        var ss = '፭';
    }
    if(output.indexOf(Math.max(...output)) == 5){
        var ss = '፮';
    }
    if(output.indexOf(Math.max(...output)) == 6){
        var ss = '፯';
    }
    if(output.indexOf(Math.max(...output)) == 7){
        var ss = '፰';
    }

    if(output.indexOf(Math.max(...output)) == 8){
        var ss = '፱';
    }
    if(output.indexOf(Math.max(...output)) == 9){
        var ss = '፲';
    }
    document.getElementById('output-block').innerText = ss;
    document.getElementById('output-block').className += ' has-output';
};

document.getElementById('clear-button').onclick = function(){
    outputChart.clear();
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    feedContext.clearRect(0, 0, feedCanvas.width, feedCanvas.height);
    document.getElementById('output-block').innerText = '';
    document.getElementById('output-block').classList.remove('has-output');
};

var saveButton = document.getElementById('save-button');
saveButton.onclick = function (){
     
   
     var canvas = document.getElementById('feed-image');
     // var dataURL = canvas.toDataURL('image/png', '');
     var context = canvas.getContext("2d");
     
     var image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
     window.location.href = image;
    
    var imad = document.getElementById('imad');
    imad.src = image;
    

}; 

