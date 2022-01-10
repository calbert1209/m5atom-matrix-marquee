

class ColumnDigest {
	constructor(value, width, height) {
		this.digestValue = value;
		this.width = width;
		this.height = height;
	}

	toIndices(columnIndex) {
		let indices = [];
		for(let i = 0; i < this.height; i++) {
			const binaryValue = (this.digestValue >> i) & 1;
			if (!binaryValue) {
				continue;
			}

			const index = (this.width * i) + columnIndex;
			indices.push(index);
		}

		return indices;
	}
}

class MatrixFrame {
  constructor(digests) {
    this.digests = digests;
  }

  toIndices() {
    let indices = [];

    for(let c = 0; c < this.digests.length; c++) {
      const indicesInColumn = this.digests[c].toIndices(c);
      indices = [...indices, ...indicesInColumn];
    }

    return indices;
  }
}

class MatrixCanvas {
  constructor(lights) {
    this.setPixel = (...args) => lights.setPixel(...args);
    this.makeHSB = (...args) => lights.makeHSB(...args);
  }

  drawFrame(frame, h, s, b) {
    const color = this.makeHSB(h, s, b);
    frame.toIndices().forEach(index => this.setPixel(index, color))
  }
}

export {ColumnDigest, MatrixFrame, MatrixCanvas};