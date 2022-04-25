module.exports = (router, controller, routeName) => {
	router.use((req, res, next) => {
		console.log('Time: ', Date.now());
		next();
	});
	router.get('/detail/:id', (req, res, next) => {
		controller.detail(req, res, next);
	});

	router.get('/search',  (req, res, next) => {
		 controller.search(req, res, next);
	});

	router.post('/insert',  (req, res, next) => {
		 controller.insert(req, res, next);
	});
	router.post('batch-insert' , (req , res ,next)=>{
		// req.body should an array of model
		 controller.batchInsert(req , res , next)
	})

	router.put('/update/:id',  (req, res, next) => {
		 controller.update(req, res, next);
	});

	router.delete('/delete/:id',  (req, res, next) => {
		 controller.delete(req, res, next);
	});
	return router;
};
