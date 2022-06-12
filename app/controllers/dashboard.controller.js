const dashboardService = require('../services/dashboard.service');
const { statusCode } = require('../constant');

class DashboardController {
	constructor() {
		this.service = dashboardService;
	}

	async getOverviewUser(req, res) {
		const result = await dashboardService.getOverviewUser(req);
		return res.status(statusCode.SUCCESS_CODE).json(result);
	}

	async getOverviewLocation(req, res) {
		const result = await dashboardService.getOverviewLocation(req);
		return res.status(statusCode.SUCCESS_CODE).json(result);
	}

	async getOverviewSensor(req, res) {
		const result = await dashboardService.getOverviewSensor(req);
		return res.status(statusCode.SUCCESS_CODE).json(result);
	}

	async getOverviewAqi(req, res) {
		return dashboardService.getOverviewAqi(req);
	}
}

module.exports = new DashboardController();
