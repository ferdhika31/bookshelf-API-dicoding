/**
 * Set payload book
 * @param {*} payload
 * @returns
 */
const setPayload = (payload) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = payload;

	const finished = pageCount === readPage;

	return {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		finished,
	};
};

/**
 * Check empty name
 * @param {*} name
 * @returns
 */
const checkEmptyName = (name) => {
	const empty = ["", null, NaN, undefined];
	return empty.includes(name);
};

/**
 * Check read page
 * @param {*} readPage
 * @param {*} pageCount
 */
const checkReadPage = (readPage = 0, pageCount = 0) => {
	return readPage > pageCount;
};

module.exports = {
	setPayload,
	checkEmptyName,
	checkReadPage,
};
