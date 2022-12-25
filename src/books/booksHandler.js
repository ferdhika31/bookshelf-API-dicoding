const { nanoid } = require("nanoid");
const constants = require("../../consts");
const respond = require("../../utils/respond");
const books = require("./books");
const booksValidation = require("./booksValidation");
const bookHelper = require("./booksHelper");

/**
 * Criteria 1. Save a book
 * @param {*} request
 * @param {*} h
 * @returns
 */
const addHandler = (request, h) => {
	const payload = bookHelper.setPayload(request.payload);

	const id = nanoid(16);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		...payload,
		id,
		insertedAt,
		updatedAt,
	};

	// check validation
	const checkValidation = booksValidation.checkStoreValidation(newBook);
	if (checkValidation.status === constants.FAIL) {
		return respond.resBadRequest(h, checkValidation.message);
	}

	// insert to books storage
	books.push(newBook);

	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if (isSuccess) {
		return respond.resCreated(h, "Buku berhasil ditambahkan", {
			bookId: id,
		});
	}

	return respond.resInternalServerError(h, "Buku gagal ditambahkan");
};

/**
 * Criteria 2. Get books
 * @param {*} request
 * @param {*} h
 * @returns
 */
const getAllHandler = async (request, h) => {
	const { name, reading, finished } = request.query;
	const qName = (name || "").toLowerCase();
	let tempBooks = [];

	for (let i = 0; i < books.length; i++) {
		const book = books[i];
		const bookName = book.name.toLowerCase();
		const bookReading = book.reading ? 1 : 0;
		const bookFinished = book.finished ? 1 : 0;

		// query
		const noQuery =
			name === undefined &&
			reading === undefined &&
			finished === undefined;
		const onlyName =
			bookName.includes(qName) &&
			reading === undefined &&
			finished === undefined;
		const onlyReading =
			reading !== undefined &&
			bookReading === Number(reading) &&
			finished === undefined &&
			name === undefined;
		const onlyFinished =
			finished !== undefined &&
			bookFinished === Number(finished) &&
			reading === undefined &&
			name === undefined;

		if (noQuery || onlyName || onlyReading || onlyFinished) {
			tempBooks.push({
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			});
		}
	}

	return respond.resSuccessData(h, null, { books: tempBooks });
};

/**
 * Criteria 3. Show a book by id
 * @param {*} request
 * @param {*} h
 * @returns
 */
const getByIdHandler = (request, h) => {
	const { id } = request.params;
	const book = books.filter((b) => b.id === id)[0];

	if (book !== undefined) {
		return respond.resSuccessData(h, null, { book: book });
	}

	return respond.resNotFound(h, "Buku tidak ditemukan");
};

/**
 * Criteria 4. Edit a book by id
 * @param {*} request
 * @param {*} h
 * @returns
 */
const editByIdHandler = (request, h) => {
	const { id } = request.params;
	const payload = bookHelper.setPayload(request.payload);
	const updatedAt = new Date().toISOString();

	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		// check validation
		const checkValidation = booksValidation.checkEditValidation(
			request.payload
		);
		if (checkValidation.status === constants.FAIL) {
			return respond.resBadRequest(h, checkValidation.message);
		}

		// update book
		books[index] = {
			...books[index],
			...payload,
			updatedAt,
		};
		return respond.resSuccessData(h, "Buku berhasil diperbarui", null);
	}

	return respond.resNotFound(h, "Gagal memperbarui buku. Id tidak ditemukan");
};

/**
 * Criteria 5. Delete a book by id
 * @param {*} request
 * @param {*} h
 * @returns
 */
const deleteByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = books.findIndex((note) => note.id === id);

	if (index !== -1) {
		books.splice(index, 1);

		return respond.resSuccessData(h, "Buku berhasil dihapus", null);
	}

	return respond.resNotFound(h, "Buku gagal dihapus. Id tidak ditemukan");
};

module.exports = {
	addHandler,
	getAllHandler,
	getByIdHandler,
	editByIdHandler,
	deleteByIdHandler,
};
