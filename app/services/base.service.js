const { Op } = require('sequelize');

class BaseService {
	constructor(Model) {
		this.model = Model;
	}
	// ex : http://localhost:3001/address/search?address=%sydz%&limit=10&offset=0
	search(whereClause, offset = 0, limit = 10) {
		const tranformWhereClause = {};
		if (Object.keys(whereClause).length) {
			Object.keys(whereClause).forEach((key) => {
				const value = whereClause[key];
				if (value.startsWith('%') || value.endsWith('%')) {
					tranformWhereClause[key] = {
						[Op.like]: value,
					};
				}
				// more if block
			});
		}
		console.log(tranformWhereClause);
		return this.model.findAndCountAll({
			where: tranformWhereClause,
			offset,
			limit,
			order: [['updated_at', 'ASC']],
		});
	}
	async findOne(whereClause, includeClause) {
		return this.model.findOne({ where: whereClause, include: includeClause });
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

	delete(whereClause) {
		return this.model.destroy({ where: { ...whereClause } });
	}
}

module.exports = BaseService;
