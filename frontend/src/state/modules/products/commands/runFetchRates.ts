export async function runFetchRates() {
	const res = await fetch('/api/rates');

	return await res.json();
};
