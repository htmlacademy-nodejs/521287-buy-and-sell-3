'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../../constants`);
const {
  offerValidator,
  offerExist,
  commentValidator,
} = require(`../../middlewares`);

module.exports = (app, service, commentService) => {
  const route = new Router();

  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;

    if (limit || offset) {
      result = await service.findPage({limit, offset});
    } else {
      result = await service.findAll(comments);
    }

    return res.status(HttpCode.OK).json(result);
  });

  route.get(`/:offerId`, offerExist(service), (req, res) => {
    const {offer} = res.locals;

    return res.status(HttpCode.OK).json(offer);
  });

  route.post(`/`, offerValidator, async (req, res) => {
    const offer = await service.create(req.body);

    return res.status(HttpCode.CREATED).json(offer);
  });

  route.put(`/:offerId`, offerValidator, async (req, res) => {
    const {offerId} = req.params;

    const updated = await service.update(offerId, req.body);

    if (!updated) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} wasn't found`);
    }

    return res.status(HttpCode.OK).send(`Offer was updated`);
  });

  route.delete(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;

    const deletedOffer = await service.drop(offerId);

    if (!deletedOffer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} wasn't found`);
    }

    return res.status(HttpCode.OK).json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExist(service), async (req, res) => {
    const {offerId} = req.params;

    const comments = await commentService.findAll(offerId);

    return res.status(HttpCode.OK).json(comments);
  });

  route.delete(
      `/:offerId/comments/:commentId`,
      offerExist(service),
      async (req, res) => {
        const {commentId} = req.params;

        const deletedComment = await commentService.drop(commentId);

        if (!deletedComment) {
          return res
            .status(HttpCode.NOT_FOUND)
            .send(`Comment with ${commentId} wasn't found`);
        }

        return res.status(HttpCode.OK).json(deletedComment);
      }
  );

  route.post(
      `/:offerId/comments`,
      [offerExist(service), commentValidator],
      async (req, res) => {
        const {offerId} = req.params;

        const comment = await commentService.create(offerId, req.body);

        return res.status(HttpCode.CREATED).json(comment);
      }
  );
};
