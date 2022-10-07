class Cursor {
	buffer: any;
	dataView: any;
	pos: any;
	bitCounter: any;
	bitValue: any;
	constructor(buffer?: ArrayBuffer) {
		this.buffer = buffer || new ArrayBuffer(64);
		this.dataView = new DataView(this.buffer);
		this.pos = 0;
		this.bitCounter = 0;
		this.bitValue = 0;
	}

	extendIfNeeded(adding: number) {
		if (this.pos + adding > this.buffer.byteLength) {
			const newBuffer = new ArrayBuffer(this.buffer.byteLength * 2);
			const newBufferDataView = new DataView(newBuffer);
			for (let i = 0; i < this.buffer.byteLength; i++) {
				newBufferDataView.setUint8(i, this.dataView.getUint8(i));
			}
			this.buffer = newBuffer;
			this.dataView = newBufferDataView;
		}
	}

	readBit() {
		if (this.bitCounter === 0) {
			this.bitValue = this.dataView.getUint8(this.pos);
			this.seek(1);
			this.bitCounter = 8;
		}

		const bit = this.bitValue & 1;
		this.bitCounter -= 1;
		this.bitValue = this.bitValue >>> 1;
		return bit;
	}

	readUint8() {
		const ret = this.dataView.getUint8(this.pos);
		this.seek(1);
		return ret;
	}

	readUint16(le: boolean) {
		const ret = this.dataView.getUint16(this.pos, le === true ? true : false);
		this.seek(2);
		return ret;
	}

	readUint32(le: boolean) {
		const ret = this.dataView.getUint32(this.pos, le === true ? true : false);
		this.seek(4);
		return ret;
	}

	readInt8() {
		const ret = this.dataView.getInt8(this.pos);
		this.seek(1);
		return ret;
	}

	readInt16(le: boolean) {
		const ret = this.dataView.getInt16(this.pos, le === true ? true : false);
		this.seek(2);
		return ret;
	}

	readInt32(le: boolean) {
		const ret = this.dataView.getInt32(this.pos, le === true ? true : false);
		this.seek(4);
		return ret;
	}

	readFloat32(le: boolean) {
		const ret = this.dataView.getFloat32(this.pos, le === true ? true : false);
		this.seek(4);
		return ret;
	}

	readFloat64(le: boolean) {
		const ret = this.dataView.getFloat64(this.pos, le === true ? true : false);
		this.seek(8);
		return ret;
	}

	writeUint8(v: any) {
		this.extendIfNeeded(1);
		this.dataView.setUint8(this.pos, v);
		this.seek(1);
	}

	writeUint16(v: any, le: boolean) {
		this.extendIfNeeded(2);
		this.dataView.setUint16(this.pos, v, le === true ? true : false);
		this.seek(2);
	}

	writeUint32(v: any, le: boolean) {
		this.extendIfNeeded(4);
		this.dataView.setUint32(this.pos, v, le === true ? true : false);
		this.seek(4);
	}

	writeInt8(v: any) {
		this.extendIfNeeded(1);
		this.dataView.setInt8(this.pos, v);
		this.seek(1);
	}

	writeInt16(v: any, le: boolean) {
		this.extendIfNeeded(2);
		this.dataView.setInt16(this.pos, v, le === true ? true : false);
		this.seek(2);
	}

	writeInt32(v: any, le: boolean) {
		this.extendIfNeeded(4);
		this.dataView.setInt32(this.pos, v, le === true ? true : false);
		this.seek(4);
	}

	writeFloat32(v: any, le: boolean) {
		this.extendIfNeeded(4);
		this.dataView.setFloat32(this.pos, v, le === true ? true : false);
		this.seek(4);
	}

	writeFloat64(v: any, le: boolean) {
		this.extendIfNeeded(8);
		this.dataView.setFloat64(this.pos, v, le === true ? true : false);
		this.seek(8);
	}

	seek(offset: number) {
		if (this.pos + offset > this.buffer.byteLength || this.pos + offset < 0) {
			throw new Error(
				`invalid seek to ${this.pos + offset} (by ${offset}) on buffer of length ${
					this.buffer.byteLength
				}`
			);
		}
		this.pos += offset;
	}
}

export { Cursor };
