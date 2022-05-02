module.exports = [
	{
		script: 'server.js',
		exec_mode: 'cluster',
		instances: 2,
		env: {
			STATUS: 'production',
		},
	},
];
