import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import type { HealthResponse } from '@repo/types'

@ApiTags('Health')
@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({ summary: 'Health check' })
    check(): HealthResponse {
        return { status: 'ok', timestamp: new Date().toISOString() }
    }
}
