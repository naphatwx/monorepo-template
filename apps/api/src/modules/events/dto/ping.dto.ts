import { createZodDto } from 'nestjs-zod'
import { pingPayloadSchema } from '@repo/types'

export class PingDto extends createZodDto(pingPayloadSchema) {}
