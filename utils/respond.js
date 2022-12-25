const constants = require("../consts");

/**
 * Response Success
 * @param {*} res 
 * @param {*} msg 
 * @param {*} data 
 * @returns 
 */
const resSuccessData = function (res, msg, data) {
	msg = msg !== undefined ? msg : constants.SUCCESS;

	const response = res.response({
		status: constants.SUCCESS,
		data: data,
		message: msg,
	});

	response.code(200);

	return response;
};

/**
 * Response Created
 * @param {*} res 
 * @param {*} msg 
 * @param {*} data 
 * @returns 
 */
const resCreated = function (res, msg, data) {
	msg = msg !== undefined ? msg : constants.CREATED;

	const response = res.response({
		status: constants.SUCCESS,
		data: data,
		message: msg,
	});

	response.code(201);

	return response;
};

/**
 * Response Not Found
 * @param {*} res 
 * @param {*} msg 
 * @returns 
 */
const resNotFound = function (res, msg) {
	msg = msg !== undefined ? msg : constants.NOT_FOUND;

	const response = res.response({
		status: constants.FAIL,
		message: msg,
	});
	response.code(404);

	return response;
};

/**
 * Response Bad Request
 * @param {*} res 
 * @param {*} msg 
 * @returns 
 */
const resBadRequest = function (res, msg) {
	msg = msg !== undefined ? msg : constants.BAD_REQUEST;

	const response = res.response({
		status: constants.FAIL,
		message: msg,
	});
	response.code(400);

	return response;
};

/**
 * Response Internal Server Error
 * @param {*} res 
 * @param {*} msg 
 * @returns 
 */
const resInternalServerError = function (res, msg) {
	msg = msg !== undefined ? msg : constants.INTERNAL_SERVER;

	const response = res.response({
		status: constants.FAIL,
		message: msg,
	});
	response.code(500);

	return response;
};

module.exports = {
	resSuccessData,
	resCreated,
	resBadRequest,
	resNotFound,
	resInternalServerError,
};
