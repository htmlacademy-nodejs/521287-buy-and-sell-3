'use strict';

const Aliase = require(`../models/aliase`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    await offer.addCategories(offerData.categories);

    return offer.get();
  }

  async drop(id) {
    const deletedRows = await this._Offer.destroy({
      where: {id},
    });
    const wasDropped = !!deletedRows;

    return wasDropped;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }

    const offers = await this._Offer.findAll({include});
    const result = offers.map((item) => item.get());

    return result;
  }

  findOne(id) {
    const result = this._Offer.findByPk(id, {
      include: [Aliase.CATEGORIES],
    });

    return result;
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Offer.findAndCountAll({
      limit,
      offset,
      include: [Aliase.CATEGORIES],
      distinct: true,
    });

    return {count, offers: rows};
  }

  async update(id, offer) {
    const [updatedRows] = await this._Offer.update(offer, {
      where: {id}
    });
    const wasUpdated = !!updatedRows;

    return wasUpdated;
  }
}

module.exports = OfferService;
