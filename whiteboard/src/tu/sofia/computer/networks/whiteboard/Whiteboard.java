package tu.sofia.computer.networks.whiteboard;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/whiteboard", encoders = { FigureEncoder.class }, decoders = { FigureDecoder.class })
public class Whiteboard {

	private static final Object PRESENT = new Object();

	private static final ConcurrentMap<Session, Object> peers = new ConcurrentHashMap<>();

	@OnOpen
	public void onOpen(Session peer) {
		peers.put(peer, PRESENT);
	}

	@OnClose
	public void onClose(Session peer) {
		peers.remove(peer);
	}

	@OnMessage
	public void broadcastFigure(Figure figure, Session session) throws IOException, EncodeException {
		for (Session peer : session.getOpenSessions()) {
			if (!peer.equals(session)) {
				peer.getBasicRemote().sendObject(figure);
			}
		}
	}

	@OnMessage
	public void broadcastSnapshot(ByteBuffer data, Session session) throws IOException {
		for (Session peer : session.getOpenSessions()) {
			if (!peer.equals(session)) {
				peer.getBasicRemote().sendBinary(data);
			}
		}
	}
}
