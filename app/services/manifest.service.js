const { Manifest, User, Permission} = require('../models/index.model');
const BaseService = require('./base.service')


class ManifestService extends BaseService {
	constructor() {
		super(Manifest);
	}

  // more query
  async addPermission(req) {
    return Manifest.findByPk(req.body.manifestId)
      .then((manifest) => {
        if (!manifest) {
          console.log("Manifest not found!");
          return null;
        }
        return Permission.findByPk(req.body.permissionId).then((permission) => {
          if (!permission) {
            console.log("Permission not found!");
            return null;
          }
          manifest.addPermission(permission);
          console.log(`>> added Manifest id=${manifest.id} to Permission id=${permission.id}`);
          return manifest;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Permission to Manifest: ", err);
      });
  }

}

module.exports = new ManifestService();
