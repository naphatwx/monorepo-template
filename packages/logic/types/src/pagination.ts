import { z } from "zod"

// Pagination contract shared by the API and the web app.
// Request query in, response envelope out.
export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type PaginationQuery = z.infer<typeof paginationQuerySchema>

export const paginationMetaSchema = z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
})

export type PaginationMeta = z.infer<typeof paginationMetaSchema>

// Wraps a page of items with its meta. T is the item type.
export type Paginated<T> = {
    data: T[]
    meta: PaginationMeta
}
