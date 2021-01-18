'use strict';

class CommentService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.comment;
  }

  create(offerId, comment) {
    const newComment = this._Comment.create({
      offerId,
      ...comment,
    });

    return newComment;
  }

  async drop(id) {
    const deletedRows = await this._Comment.destroy({
      where: {id}
    });
    const wasDropped = !!deletedRows;

    return wasDropped;
  }

  findAll(offerId) {
    const result = this._Comment.findAll({
      where: {offerId},
      raw: true,
    });

    return result;
  }
}

module.exports = CommentService;
