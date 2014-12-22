package tu.sofia.computer.networks.whiteboard;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

public class FigureDecoder implements Decoder.Text<Figure> {

    @Override
    public Figure decode(String string) throws DecodeException {
        return new Gson().fromJson(string, Figure.class);
    }

    @Override
    public boolean willDecode(String string) {
    	boolean willDecode = true;
        try {
        	new Gson().fromJson(string, Figure.class);
        } catch (Exception ex) {
            willDecode = false;
        }
        return willDecode;
    }

    @Override
    public void init(EndpointConfig ec) {
    }

    @Override
    public void destroy() {
    }
}
