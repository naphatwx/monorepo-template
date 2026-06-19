import { createZodDto } from "nestjs-zod"
import { paginationQuerySchema } from "@repo/types"

// NestJS DTO wrapping the shared pagination query schema.
export class PaginationDto extends createZodDto(paginationQuerySchema) {}
