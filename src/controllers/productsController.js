const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {Op} = require('sequelize')

const controller = {
	// Root - Show all products
	index: (req, res) => {

		db.Product.findAll({
			include : ['images']
		})
			.then(products => {
				return res.render('products',{
					products,
					toThousand
				})
			})
			.catch(error => console.log(error))
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		db.Product.findByPk(req.params.id,{
			include : ['images']
		})
			.then(product => {
				return res.render('detail',{
					product,
					toThousand
				})
			})
			.catch(error => console.log(error))		
	},

	// Create - Form to create
	create: (req, res) => {
		db.Category.findAll()
			.then(categories => {
				return res.render('product-create-form',{
					categories
				})
			})
			.catch(error => console.log(error))		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {title,price,discount,description,categoryId} = req.body;

		db.Product.create({
			title : title.trim(),
			price : +price,
			discount : +discount,
			description : description.trim(),
			categoryId 
		})
			.then(product => {
				if(req.files.length > 0){
					let images = req.files.map(({filename},i) => {
						let image = {
							file : filename,
							productId : product.id,
							primary : i === 0 ? 1 : 0
						}
						return image
					})
					db.Image.bulkCreate(images,{validate :true})
						.then( (result) => console.log(result))		
				}
				return res.redirect('/products')
			})
			.catch(error => console.log(error))	
	},

	// Update - Form to edit
	edit: (req, res) => {

		let product = db.Product.findByPk(req.params.id,{
			include : ['images']
		})
		let categories = db.Category.findAll()

		Promise.all([product,categories])
			.then(([product,categories]) => {
				return res.render('product-edit-form',{
					product,
					categories
				})
			})
			.catch(error => console.log(error))		
	
	},
	// Update - Method to update
	update: (req, res) => {

		const {title, price,discount,description, categoryId} =req.body;
		
		db.Product.update(
			{
				title : title.trim(),
				price : +price,
				discount : +discount,
				description : description.trim(),
				categoryId 
			},
			{
				where : {
					id : req.params.id
				}
			}
		).then(async () => {
			if(req.file){
				try {
					await db.Image.update(
						{
							file : req.file.filename
						},
						{
							where : {
								productId : req.params.id,
								primary : true
							}
						}
					)
				} catch (error) {
					console.log(error);
				}
			}
			return res.redirect('/products');

		}).catch(error => console.log(error))
	},

	// Delete - Delete one product from DB
	delete : (req, res) => {

		db.Product.destroy({
			where : {
				id : req.params.id
			}
		})
			.then((info) => {
				return res.redirect('/products');
			})
			.catch(error => console.log(error))
	},
	recycle : (req,res) => {
		db.Product.findAll({
			where : {
				deletedAt : {
					[Op.not] : null
				}
			},
			paranoid : false,
			include : ['images']
		})
			.then(products => res.render('recycle', {
				products,
				toThousand
			}))
			.catch(error => console.log(error))
	},
	restore : (req,res) => {
		db.Product.restore({
			where : {
				id : req.params.id
			}
		})
		.then((info) => {
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>',info);
			return res.redirect('/products');
		})
		.catch(error => console.log(error))
	},
	destroy : (req, res) => {

		db.Image.findAll({
			where : {
				productId : req.params.id
			}
		})
			.then(images => {
				images.forEach(image => {
					if(fs.existsSync(path.resolve(__dirname,'../../public/images/products/' + image.file))){
						console.log(image.file)
						fs.unlinkSync(path.resolve(__dirname,'../../public/images/products/' + image.file))
					}
				});
				db.Product.destroy({
					where : {
						id : req.params.id
					},
					force : true
				})
					.then((info) => {
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>',info);
						return res.redirect('/products');
					})
			})
			.catch(error => console.log(error))
	},
};

module.exports = controller;