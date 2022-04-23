module.exports = (router, controller, routeName) => {
	router.use((req, res, next) => {
		console.log(routeName + ' OK');
		console.log('Time: ', Date.now());
		next();
	});
	router.get('/detail/:id', (req, res, next) => {
		controller.detail(req, res, next);
	});

	router.get('/search', (req, res, next) => {
		controller.search(req, res, next);
	});

	router.post('/insert', (req, res, next) => {
		controller.create(req, res, next);
	});

	router.put('/update/:id', (req, res, next) => {
		res.status(200).send('test put');
	});

	router.delete('/delete', (req, res, next) => {
		res.status(200).send('test delete');
	});
	return router;
};
