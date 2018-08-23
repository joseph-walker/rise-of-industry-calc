export async function runFetchRates() {
	const res = await fetch('/data/roiRates.json');

	return await res.json();
};
