// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const getAnalytics = require('firebase/analytics').getAnalytics;
const {
	collection,
	query,
	where,
	getDocs,
	getFirestore,
	addDoc,
	startAt,
	orderBy,
	endAt,
} = require('firebase/firestore');
const {} = require('firebase/firestore');
const FirebaseUser = require('./users.model');

// app.use(bodyParser.urlencoded({ extended: true }));
// allAppRoute(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAtgb9tbS_NG3rVkLNsb6mIwL2EyhqDHX4',
	authDomain: 'connect-center-24b1e.firebaseapp.com',
	projectId: 'connect-center-24b1e',
	storageBucket: 'connect-center-24b1e.appspot.com',
	messagingSenderId: '545436821194',
	appId: '1:545436821194:web:cc86a7aab9aa2dd61ef633',
	measurementId: 'G-5ZWJKL9025',
};

// Initialize Firebase
// const appFirebase = initializeApp(firebaseConfig);
// const dbFireStore = getFirestore(appFirebase);
// const analytics = getAnalytics(fireStore);

var admin = require('firebase-admin');
var serviceAccount = require('./connect-center-24b1e-firebase-adminsdk-l1vtg-c1fe34855a.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();

const sequelize = require('firestore-sequelize');
const { Op } = require('sequelize');
sequelize.initializeApp(admin);

module.exports = function initFirebaseController(app) {
	app.post('/write', async (req, res, next) => {
		try {
			const body = req.body;
			FirebaseUser.create(body).then((json) =>
				res.json({
					code: 200,
					data: json.getData(),
				}),
			);
			// const docRef = await addDoc(collection(db, 'users'), {
			// 	name: 'Alan',
			// 	born: 1913,
			// });
			// res.json({
			// 	code: 200,
			// 	data: docRef.id,
			// });
			// console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	});

	app.get('/read', async (req, res, next) => {
		// const q = query(collection(db, 'users'), where('pass', '==', '1'));
		try {
			const { name } = req.query;
			const allEntries = [];
			const querySnapshot = await db
				.collection('users')
				.orderBy('name')
				.where('name', '>=', name)
				.where('name', '<=', name + '\uf8ff')
				.get();

			// .startAt('[a-zA-Z0-9]*')
			// .endAt(name + '\uf8ff')
			// .get();

			querySnapshot.forEach((doc) => allEntries.push(doc.data()));

			res.json({ code: 200, data: allEntries });
			// console.log('query', query);
			// const where = Object.keys(query).reduce(
			// 	(a, b) => ({
			// 		...a,
			// 		[b]: {
			// 			'==': query[b],
			// 			// '==': query[b],
			// 		},
			// 	}),
			// 	{},
			// );
			// console.log('done1', where);

			// FirebaseUser.findAll({
			// 	where,
			// }).then((json) => res.json({ code: 200, data: json.map((item) => item.getData()) }));

			// console.log('done');

			// const data = querySnapshot.map((item) => item.getData());

			// const q = query(collection(db, 'users'), orderBy('first'), startAt(name), endAt(name + '\uf8ff'));
			// const querySnapshot = await getDocs(q);

			// const data = [];
			// await querySnapshot.forEach((doc) => {
			// 	data.push(doc.data());
			// });
			// res.json({
			// 	ok: 'Ok rồi đấy',
			// 	data: data,
			// });
			// const refUsers = db.ref(db.getDatabase(), 'users');
			// await db.onValue(refUsers, (snapshot) => {

			// });
		} catch (e) {
			res.json({
				ok: 'Lỗi',
				message: e.toString(),
			});
		}
	});
};
