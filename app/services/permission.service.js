const { Permission } = require('../models/index.model');
const BaseService = require('./base.service')


class PermissionService extends BaseService {
  constructor() {
    super(Permission);
  }

  // more query
}

module.exports = new PermissionService();
