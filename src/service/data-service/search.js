'use strict';

const {Op} = require(`sequelize`);

const Aliase = require(`../models/aliase`);

class SearchService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
  }

  async findAll(searchText) {
    const offers = await this._Offer.findAll({
      where: {
        title: {
          [Op.substring]: searchText,
        }
      },
      include: [Aliase.CATEGORIES],
    });
    const result = offers.map((offer) => offer.get());

    return result;
  }
}

module.exports = SearchService;
