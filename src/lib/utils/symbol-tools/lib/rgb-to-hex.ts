function colorToHex(color: number) {
	const hexadecimal = color.toString(16);
	return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal;
}

export default function convertRGBtoHex(red: number, green: number, blue: number): number {
	return ('0x' + colorToHex(red) + colorToHex(green) + colorToHex(blue)) as unknown as number;
}
