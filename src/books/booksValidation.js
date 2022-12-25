const constants = require("../../consts");
const bookHelper = require("./booksHelper");

/**
 * Check if the book is valid
 * @param {*} book
 * @returns
 */
const checkStoreValidation = (book) => {
	let result = {
		status: constants.SUCCESS,
		message: "Lolos validasi",
	};
	if (bookHelper.checkEmptyName(book.name)) {
		result = {
			status: constants.FAIL,
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		};
	} else if (bookHelper.checkReadPage(book.readPage, book.pageCount)) {
		result = {
			status: constants.FAIL,
			message:
				"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		};
	}

	return result;
};

/**
 * Check if the book is valid
 * @param {*} book
 * @returns
 */
const checkEditValidation = (book) => {
	let result = {
		status: constants.SUCCESS,
		message: "Lolos validasi",
	};

	if (bookHelper.checkEmptyName(book.name)) {
		result = {
			status: constants.FAIL,
			message: "Gagal memperbarui buku. Mohon isi nama buku",
		};
	} else if (bookHelper.checkReadPage(book.readPage, book.pageCount)) {
		result = {
			status: constants.FAIL,
			message:
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		};
	}

	return result;
};

module.exports = {
	checkStoreValidation,
	checkEditValidation,
};
