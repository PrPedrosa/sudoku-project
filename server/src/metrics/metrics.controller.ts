import { Controller, Post, Get } from '@nestjs/common'
import { MetricsService } from './metrics.service'

@Controller('/metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post('/visit')
  async userVisit() {
    console.log('adding visit')
    await this.metricsService.addVisit()
  }

  @Post('/download')
  async userDownload() {
    console.log('adding download')
    await this.metricsService.addDownload()
  }

  @Get('/download')
  async fetchDownloads() {
    console.log('getting number of downloads')
    return await this.metricsService.getDownloads()
  }
}
