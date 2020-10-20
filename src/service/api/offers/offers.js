'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../../constants`);
const {
  offerValidator,
  offerExist,
  commentValidator,
} = require(`../../middlewares`);

const route = new Router();

module.exports = (app, service, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();

    return res.status(HttpCode.OK).json(categories);
  });

  route.get(`/:offerId`, offerExist(service), (req, res) => {
    const {offer} = res.locals;

    return res.status(HttpCode.OK).json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = service.create(req.body);

    return res.status(HttpCode.CREATED).json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const existOffer = service.findOne(offerId);

    if (!existOffer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} isn't found`);
    }

    const updatedOfffer = service.update(offerId, req.body);

    return res.status(HttpCode.OK).json(updatedOfffer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = service.drop(offerId);

    if (!deletedOffer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} isn't found`);
    }

    return res.status(HttpCode.OK).json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExist(service), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HttpCode.OK).json(comments);
  });

  route.delete(
      `/:offerId/comments/:commentId`,
      offerExist(service),
      (req, res) => {
        const {offer} = res.locals;
        const {commentId} = req.params;
        const deletedComment = commentService.drop(offer, commentId);

        if (!deletedComment) {
          return res
            .status(HttpCode.NOT_FOUND)
            .send(`Comment ${commentId} isn't found`);
        }

        return res.status(HttpCode.OK).json(deletedComment);
      }
  );

  route.post(
      `/:offerId/comments`,
      [offerExist(service), commentValidator],
      (req, res) => {
        const {offer} = res.locals;
        const comment = commentService.create(offer, req.body);

        return res.status(HttpCode.CREATED).json(comment);
      }
  );
};
