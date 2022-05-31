const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productsJSON = fs.readFileSync(productsFilePath, 'utf-8');
const products = JSON.parse(productsJSON);

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(product => product.category === "visited");
		let productsInSale = products.filter(product => product.category === "in-sale");
		return res.render('index',{
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		const {keywords} = req.query;
		let result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()) ||  product.description.toLowerCase().includes(keywords.toLowerCase()))
		return res.render('results',{
			result,
			keywords,
			toThousand
		})
	},
};

module.exports = controller;
