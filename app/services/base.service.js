const { Op } = require('sequelize');

class BaseService {
	constructor(Model) {
		this.model = Model;
	}

	// ex : http://localhost:3001/address/search?address=%sydz%&limit=10&offset=0
	search(whereClause /* object like {id : 1}*/, offset = 0, limit = 10) {
		const transformWhereClause = {};
		if (Object.keys(whereClause).length) {
			Object.keys(whereClause).forEach((key) => {
				const value = whereClause[key];
				if (value.startsWith('%') || value.endsWith('%')) {
					transformWhereClause[key] = {
						[Op.like]: value,
					};
				}
				// more if block
			});
		}

		return this.model.findAndCountAll({
			where: transformWhereClause,
			offset,
			limit,
			order: [['updated_at', 'ASC']],
		});
	}

	async findOne(whereClause /* object like {id : 1}*/, includeClause /* object config in case have associate */) {
		return this.model.findOne({ where: { ...whereClause, deleted_at: null }, include: includeClause });
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

	update(updateModel, whereClause) {
		return this.model.update(updateModel, { where: { ...whereClause } });
	}

	// will update fiel deleted_at because enable paranoid
	delete(whereClause) {
		return this.model.destroy({ where: { ...whereClause } });
	}
}

module.exports = BaseService;
