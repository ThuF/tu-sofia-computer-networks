var wsUri = "wss://" + document.location.hostname + ":" + document.location.port + document.location.pathname + "chat";
var websocket = new WebSocket(wsUri);
var username;

websocket.onopen = function(evt) {
	onOpen(evt);
};

websocket.onmessage = function(evt) {
	onMessage(evt);
};

websocket.onerror = function(evt) {
	onError(evt);
};

var output = document.getElementById("output");

function join() {
	username = textInput.value;
	websocket.send(username + " joined");
}

function sendMessage() {
	websocket.send(username + ": " + textInput.value);
}

function onOpen() {
	writeToScreen("Connected to " + wsUri);
}

function onMessage(evt) {
	if (evt.data.indexOf("joined") != -1) {
		userField.innerHTML += evt.data.substring(0, evt.data.indexOf(" joined")) + "\n";
	} else {
		chatlogField.innerHTML += evt.data + "\n";
	}
}

function onError(evt) {
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function writeToScreen(message) {
	output.innerHTML += message + "<br>";
}