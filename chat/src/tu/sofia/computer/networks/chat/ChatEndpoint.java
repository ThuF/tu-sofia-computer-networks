package tu.sofia.computer.networks.chat;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/chat")
public class ChatEndpoint {
	private static Set<Session> users = Collections.synchronizedSet(new HashSet<Session>());

	@OnOpen
	public void onOpen(Session user) {
		users.add(user);
	}

	@OnClose
	public void onClose(Session user) {
		users.remove(user);
	}

	@OnMessage
	public void message(String message) throws IOException, EncodeException {
		for (Session user : users) {
			user.getBasicRemote().sendText(message);
		}
	}
}