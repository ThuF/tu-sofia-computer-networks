var wsUri = "wss://" + document.location.hostname + ":" + document.location.port + document.location.pathname + "whiteboard";
var websocket = new WebSocket(wsUri);
websocket.binaryType = "arraybuffer";
websocket.onmessage = function(evt) { onMessage(evt); };
websocket.onerror = function(evt) { onError(evt); };

var output = document.getElementById("output");

function sendText(json) {
    websocket.send(json);
}

function sendBinary(bytes) {
    websocket.send(bytes);
}

function onMessage(evt) {
    if (typeof evt.data == "string") {
        drawImageText(evt.data);
    } else {
        drawImageBinary(evt.data);
    }
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}