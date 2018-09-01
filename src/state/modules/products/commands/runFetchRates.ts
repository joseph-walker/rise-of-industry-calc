export async function runFetchRates() {
	// @ts-ignore
	const res = await fetch(window.__CONFIG_DATA_RESOURCE_PATH);

	return await res.json();
};
