const db = require('../database/models');
const {Op} = require('sequelize')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = db.Product.findAll({
			where : {
				discount : {
					[Op.lt] : 20
				}
			},
			order : [['id','DESC']],
			limit : 4,
			include : ['images']
		})
		let productsInSale = db.Product.findAll({
			where : {
				discount : {
					[Op.gte] : 20
				}
			},
			include : ['images']
		})
		let products = db.Product.findAll({
			include : ['category','images']
		})
		Promise.all([productsVisited,productsInSale, products])
			.then(([productsVisited,productsInSale, products]) => {
				return res.render('index',{
					productsVisited,
					productsInSale,
					products,
					toThousand
				})
			})
			.catch(error => console.log(error))
	},
	search: (req, res) => {

		const {keywords} = req.query;

		db.Product.findAll({
			where : {
				[Op.or] : [
					{
						title : {
							[Op.substring] : keywords
						}
					},
					{
						description : {
							[Op.substring] : keywords
						}
					}
				]
			},
			include : ['images']
		}).then(result => {
			return res.render('results',{
				result,
				keywords,
				toThousand
			})
		}).catch(error => console.log(error))
	},
};

module.exports = controller;
