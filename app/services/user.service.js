const {User, sequelize, Manifest, Permission} = require('../models/index.model');
const BaseService = require('./base.service');
const {QueryTypes} = require('sequelize');
class UserService extends BaseService {
  constructor() {
    super(User);
  }

  getFullInfo(req) {

  };

  async addManifest(req) {
    return User.findByPk(req.body.userId)
      .then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }
        return Manifest.findByPk(req.body.manifestId).then((manifest) => {
          if (!manifest) {
            console.log("Manifest not found!");
            return null;
          }
          user.addManifest(manifest);
          console.log(`>> added User id=${user.id} to Manifest id=${manifest.id}`);
          return user;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Manifest to User: ", err);
      });
  }

  // more query
}

module.exports = new UserService();
