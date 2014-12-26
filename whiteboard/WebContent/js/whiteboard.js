var whiteboard = document.getElementById("whiteboard");
whiteboard.addEventListener("click", defineImage, false);

var context = whiteboard.getContext("2d");
            
function getCurrentPosition(evt) {
    var rect = whiteboard.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var shape = 'square';
var color = '#FF0000';

function setShape(newShape) {
	shape = newShape;
}

function setColor(newColor) {
	color = newColor;
}

function defineImage(evt) {
    var currentPosition = getCurrentPosition(evt);
    
    var json = JSON.stringify({
        "shape": shape,
        "color": color,
        "coords": {
            "x": currentPosition.x,
            "y": currentPosition.y
        }
    });
    drawImageText(json);
    sendText(json);
}

function defineImageBinary() {
    var image = context.getImageData(0, 0, whiteboard.width, whiteboard.height);
    var buffer = new ArrayBuffer(image.data.length);
    var bytes = new Uint8Array(buffer);
    for (var i=0; i<bytes.length; i++) {
        bytes[i] = image.data[i];
    }
    sendBinary(buffer);
}

function drawImageText(image) {
    var json = JSON.parse(image);
    context.fillStyle = json.color;
    switch (json.shape) {
    case "circle":
        context.beginPath();
        context.arc(json.coords.x, json.coords.y, 5, 0, 2 * Math.PI, false);
        context.fill();
        break;
    case "square":
    default:
        context.fillRect(json.coords.x, json.coords.y, 10, 10);
        break;
    }
}

function drawImageBinary(blob) {
    var bytes = new Uint8Array(blob);
    
    var imageData = context.createImageData(whiteboard.width, whiteboard.height);
    
    for (var i=8; i<imageData.data.length; i++) {
        imageData.data[i] = bytes[i];
    }
    context.putImageData(imageData, 0, 0);
    
    var img = document.createElement('img');
    img.height = whiteboard.height;
    img.width = whiteboard.width;
    img.src = whiteboard.toDataURL();
}