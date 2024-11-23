import toastit from 'toastit';

interface StripInfo {
	orderTime: string;
	pair: string;
	type: string;
	side: 'sell' | 'buy';
	average: number;
	price: number;
	executed: number;
	amount: number;
	total: number;
	status: 'filled';
}
function getStrip(element: HTMLElement) {
	// return element.closest<HTMLElement>('.css-1yensx3,.css-1j3n31m');
	return element
		.closest('.css-19qmjuh,.css-xfoack')
		?.querySelector(':scope > div > div') as HTMLElement;
}

/**
 * Returns floated number or undefined if it's not a number
 */
function number(input: any) {
	const floated = parseFloat(input);
	if (floated.toString() === input) {
		return floated;
	} else {
		return;
	}
}

function breakDownStrip(strip: HTMLElement) {
	const [
		_0,
		orderTime,
		pair,
		type,
		side,
		average,
		price,
		executed,
		amount,
		_9,
		total,
		_11,
		_12,
		_13,
		status,
	] = [...strip.querySelectorAll(':scope > div')].map((el) => {
		const content = el.textContent!.trim();
		const num = number(content);
		if (num) {
			return num;
		} else {
			return content.toLowerCase();
		}
	});
	return {
		orderTime,
		pair,
		type,
		side,
		average,
		price,
		executed,
		amount,
		total,
		status,
	} as StripInfo;
}

document.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	target.dispatchEvent(new CustomEvent('copy-t-code', {bubbles: true}));
});

declare global {
	interface WindowEventMap {
		'copy-t-code': CustomEvent;
	}
	interface DocumentEventMap {
		'copy-t-code': CustomEvent;
	}
}

document.addEventListener('copy-t-code', (event: CustomEvent) => {
	const target = event.target as HTMLElement;
	const strip = getStrip(target);
	if (strip) {
		const p = breakDownStrip(strip);
		const tcode = `binance:${p.pair.replace('/', ':')}:${p.side}:${p.price}:${p.amount}`;
		copyToClipboard(tcode);
	}
});

function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text);
	// alert('tcode copied');
	toastit('Tcode copied to clipboard.');
}
