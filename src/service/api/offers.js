'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const {
  offerValidator,
  offerExist,
  commentValidator,
} = require(`../middlewares`);

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

  route.put(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = service.update(offerId);

    if (!offer) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Offer with ${offerId} isn't found`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  route.delete(`/:offerId`, offerExist(service), (req, res) => {
    const {offerId} = req.params;
    const offer = service.drop(offerId);

    if (!offer) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Offer with ${offerId} isn't found`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  route.get(`/:offerId/comments`, offerExist(service), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK).json(comments);
  });

  route.delete(
      `/:offerId/comments/:commentId`,
      offerExist(service),
      (req, res) => {
        const {offer} = res.locals;
        const comments = commentService.findAll(offer);

        res.status(HttpCode.OK).json(comments);
      }
  );

  route.post(
      `/:offerId/comments`,
      [offerExist(service), commentValidator],
      (req, res) => {
        const {offer} = res.locals;
        const comments = commentService.findAll(offer);

        res.status(HttpCode.OK).json(comments);
      }
  );
};
