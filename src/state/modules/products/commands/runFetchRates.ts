export async function runFetchRates() {
	const res = await fetch('/data/roiRate.json');

	return await res.json();
};
