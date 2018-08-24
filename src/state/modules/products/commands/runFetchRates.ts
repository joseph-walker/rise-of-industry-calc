export async function runFetchRates() {
	const res = await fetch('/datas/roiRates.json');

	return await res.json();
};
