import { RequestHandler } from "express";
import { z } from "zod";

export const validateRequest = <
    P extends z.ZodSchema,
    R extends z.ZodSchema,
    B extends z.ZodSchema,
    Q extends z.ZodSchema,
>(schema: {
    params?: P;
    response?: R;
    body?: B;
    query?: Q;
}): RequestHandler<
    z.output<P>,
    z.output<R>,
    z.output<B>,
    z.output<Q>
> => (req, res, next) => {

    Object.defineProperty(req, 'params', {
        value: req.params,
        writable: true,
    });
    Object.defineProperty(req, 'query', {
        value: req.query,
        writable: true,
    });
    Object.defineProperty(req, 'body', {
        value: req.body,
        writable: true,
    });

    if (schema.params) {
        req.params = schema.params.parse(req.params);
    }

    if (schema.query) {
        req.query = schema.query.parse(req.query);
    }

    if (schema.body) {
        req.body = schema.body.parse(req.body);
    }

    next();
};
