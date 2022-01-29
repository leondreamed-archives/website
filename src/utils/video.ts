export function supportsHEVCAlpha() {
	const { navigator } = window;
	const ua = navigator.userAgent.toLowerCase();
	const hasMediaCapabilities = Boolean(
		navigator.mediaCapabilities?.decodingInfo
	);
	const isSafari =
		ua.includes('safari') && !ua.includes('chrome') && ua.includes('version/');
	return isSafari && hasMediaCapabilities;
}
