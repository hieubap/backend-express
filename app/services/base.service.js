class BaseService {
    constructor(Model) {
        this.model = Model
    }

    async search(whereClause , offset , limit) {
        await this.model.findAndCountAll({where: {...whereClause} , limit , offset})
    }

    async detail(id) {
        await this.model.findByPk(id)
    }

    async insert(model) {
        await this.model.create(model)
    }

    async update(updateModel, whereClause) {
        await this.model.update(updateModel, {where: {...whereClause}})
    }

    async delete(whereClause) {
        await this.model.destroy({...whereClause})
    }

}

module.exports = BaseService;