
import Timer from "timer";
import {ColumnDigest, MatrixFrame} from "ledMatrix";
import { MatrixCanvas } from "./ledMatrix";
import { toDigestValues } from "./glyphs";

if (!globalThis.lights || !globalThis.accelerometer || !globalThis.button)
	throw new Error("this M5 example requires lights, accelerometer, and a button");

let brightness = 130;
lights.brightness = brightness;

const mtxCanvas = new MatrixCanvas(lights);

const MTX_WIDTH = 5;
const MTX_HEIGHT = 5;

const clear = () => lights.fill(lights.makeRGB(0,0,0));
const shift = (hue) => (hue + 10) % 360;

let count = 0;
let hue = Math.floor(Math.random() * 36) * 10;

button.a.onChanged = () => {
	if (button.a.read()) {
		hue = shift(hue);
	}
}

const columns = toDigestValues(
	"\"What's the frequency, Kenneth?\", he asked  as he pummeled Dan Rather."
);

Timer.repeat(() => {
	clear();
	// ensures slice doesn't return partial view;
	const view = [...columns, ...columns].slice(count, count + 5);
	const digests = view.map(v => new ColumnDigest(v, MTX_WIDTH, MTX_HEIGHT));
	const frame = new MatrixFrame(digests);
	mtxCanvas.drawFrame(frame, hue, 1000, 800);
	lights.update();
	count = (count + 1) % columns.length;
}, 160);
