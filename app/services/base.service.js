const { Op } = require('sequelize');
const { isEmpty } = require('../utils');

class BaseService {
	constructor(Model) {
		this.model = Model;
	}

	// ex : http://localhost:3001/address/search?address=%sydz%&limit=10&offset=0
	search(rest /* object like {id : 1}*/, page = 1, size = 10, excludeAttribute /* array*/) {
		return this.model.findAndCountAll({
			where: rest,
			attributes: { exclude: excludeAttribute },
			offset: (page - 1) * size,
			limit: size,
			order: [['created_at', 'ASC']],
		});
	}

	async findOne(whereClause /* object like {id : 1}*/, includeClause /* object config in case have associate */) {
		return this.model.findOne({ where: { ...whereClause }, include: includeClause });
	}

	detail(id) {
		return this.model.findByPk(id);
	}

	insert(model) {
		return this.model.create(model);
	}

	batchInsert(listModel) {
		return this.model.bulkCreate(listModel, { validate: true });
	}

	async update(updateModel, whereClause) {
		const modelObj = await this.model.findByPk(whereClause.id);
		if (!modelObj) return null;
		return this.model.update(updateModel, { where: { ...whereClause } });
	}

	async toggleActive(id) {
		const modelObj = await this.model.findByPk(id);
		if (!modelObj) return null;
		return this.model.update({ is_active: ((modelObj.is_active || 0) + 1) % 2 }, { where: { id } });
	}

	// will update fiel deleted_at because enable paranoid
	async delete(whereClause) {
		const modelObj = await this.model.findByPk(whereClause.id);
		if (!modelObj) return null;
		return this.model.destroy({ where: { ...whereClause } });
	}
}

module.exports = BaseService;
