const {
	addHandler,
	getAllHandler,
	getByIdHandler,
	editByIdHandler,
	deleteByIdHandler,
} = require("./books/booksHandler");

const routes = [
	{
		method: "POST",
		path: "/books",
		handler: addHandler,
	},
	{
		method: "GET",
		path: "/books",
		handler: getAllHandler,
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: getByIdHandler,
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: editByIdHandler,
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: deleteByIdHandler,
	},
];

module.exports = routes;
