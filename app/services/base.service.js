const { Op } = require('sequelize');

class BaseService {
	constructor(Model) {
		this.model = Model;
	}

	// ex : http://localhost:3001/address/search?address=%sydz%&limit=10&offset=0
	search(rest /* object like {id : 1}*/, offset = 0, limit = 10, excludeAttribute /* array*/) {
		return this.model.findAndCountAll({
			where: rest,
			attributes: { exclude: excludeAttribute },
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
