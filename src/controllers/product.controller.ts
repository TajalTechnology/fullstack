import { Request, Response } from "express";
import { update } from "lodash";
import { CreateProductInput, UpdateProductInput, ReadProductInput, DeleteProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../services/product.service";


export async function createProductHandler(
    req: Request<{}, {}, CreateProductInput["body"]>,
    res: Response) {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
}

export async function updateProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
        new: true,
    });

    return res.send(updatedProduct);
}


export async function getProductHandler(
    req: Request,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params._id;

    const product = await findProduct({ productId });
    if (!product) return res.sendStatus(404);
    if (product.user !== userId) res.sendStatus(403);
    const updateProduct = await findAndUpdateProduct({ productId }, update, { new: true });
    return res.send(updateProduct);

};

export async function deleteProductHandler(
    req: Request,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params._id;

    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);

};