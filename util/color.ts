function getColorText(percent: number | string): string {
	percent = Number(percent)
	if (percent >= 99.9) {
		return '#059669'
	} else if (percent >= 99) {
		return '#3bd671'
	} else if (percent >= 95) {
		return '#f29030'
	} else if (Number.isNaN(percent)) {
		return 'gray'
	} else {
		return '#df484a'
	}
}

function getColor(percent: number | string, darker: boolean): string {
	if (darker) return getColorText(percent);

	if (Number.isNaN(Number(percent))) return 'gray';

	percent = Math.max(98, Math.min(Number(percent), 100));
	const l = map(percent, 98, 100, 55, 65);
	return `hsl(${map(percent, 98, 100, 0, 120)}deg, ${95}%, ${l}%)`;
}

const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number =>
	((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;


export { getColor }
