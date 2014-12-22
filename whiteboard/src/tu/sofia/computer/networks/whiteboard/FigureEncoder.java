package tu.sofia.computer.networks.whiteboard;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

public class FigureEncoder implements Encoder.Text<Figure> {

    @Override
    public String encode(Figure figure) throws EncodeException {
        return new Gson().toJson(figure);
    }

    @Override
    public void init(EndpointConfig ec) {
    }

    @Override
    public void destroy() {
    }
}
