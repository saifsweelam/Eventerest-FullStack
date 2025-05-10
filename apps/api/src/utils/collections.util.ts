import { prisma } from '../lib/db';
import { CollectionQuery } from '../schemas/generic.schemas';

export type CollectionArgs = {
    skip: number;
    take: number;
    orderBy?: {
        [field: string]: 'asc' | 'desc';
    }
}

export function getCollectionArgs(query: CollectionQuery, modelName: ModelName): CollectionArgs {
    let { page = 1, limit = 10, offset, sortBy, sortOrder = 'asc' } = query;

    offset = offset ?? (page - 1) * limit;

    const args: CollectionArgs = {
        skip: offset,
        take: limit,
    }

    if (sortBy && Object.keys(prisma[modelName].fields).includes(sortBy)) {
        args.orderBy = {
            [sortBy]: sortOrder,
        }
    }

    return args;
}