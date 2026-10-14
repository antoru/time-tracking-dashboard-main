async function getData() {
	const url = './data.json';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(error.message);
		throw error;
	}
}

async function init() {
	try {
		const activities = await getData();

		console.log('activities', activities);

		const buttonsContainer = document.querySelector('.buttons');

		buttonsContainer.addEventListener('click', (event) => {
			const button = event.target.closest('button');

			if (!button) return;

			const period = button.dataset.period; // "daily", "weekly", or "monthly"

			console.log(period);
		});
	} catch (error) {
		console.error(error);
	}
}

init();
