async function getData() {
	const url = './data.json';

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	return await response.json();
}

function returnHourString(hour) {
	return hour === 1 ? 'hr' : 'hrs';
}

function updateCards(activities, period, cardsContainer) {
	activities.forEach((activity) => {

		const activityTitle = activity.title;
		const activityTimeframes = activity.timeframes;
		const timeFrameToPrint = activityTimeframes[period];
		const currentToPrint = timeFrameToPrint.current;
		const currentStringToPrint = returnHourString(currentToPrint);
		const previousToPrint = timeFrameToPrint.previous;
		const previousStringToPrint = returnHourString(previousToPrint);

		const targetCard = cardsContainer.querySelector(
			`.card-outer[data-title="${activityTitle}"]`
		);

		if (!targetCard) return;

		const currentElement = targetCard.querySelector('.current');
		const previousElement = targetCard.querySelector('.previous');

		currentElement.textContent = `${currentToPrint}${currentStringToPrint}`;
		previousElement.textContent = `Last Week - ${previousToPrint}${previousStringToPrint}`;
	});
}

async function init() {
	try {

		const cardsContainer = document.querySelector('.cards');
		const buttonsContainer = document.querySelector('.buttons');
		const buttonsNodelist = buttonsContainer.querySelectorAll('button');
		const activities = await getData();

		buttonsContainer.addEventListener('click', (event) => {
			const clickedButton = event.target.closest('button');
			if (!clickedButton) return;

			buttonsNodelist.forEach((button) => {
				button.setAttribute('aria-pressed', 'false');
			});

			clickedButton.setAttribute('aria-pressed', 'true');

			const period = clickedButton.dataset.period; // "daily", "weekly", or "monthly"

			updateCards(activities, period, cardsContainer);
		});
	} catch (error) {
		console.error(error);
	}
}

init();
