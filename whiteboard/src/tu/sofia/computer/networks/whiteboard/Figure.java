package tu.sofia.computer.networks.whiteboard;

public class Figure {

	private String shape;
	private String color;
	private Position coords;

	public Figure() {
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Position getCoords() {
		return coords;
	}

	public void setCoords(Position coords) {
		this.coords = coords;
	}
}
