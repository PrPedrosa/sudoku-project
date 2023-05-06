import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Metrics } from 'src/schemas/metrics.schema'

@Injectable()
export class MetricsService {
  constructor(
    @InjectModel(Metrics.name)
    private readonly metricsModel: Model<Metrics>
  ) {}

  async addVisit() {
    try {
      const metric = await this.metricsModel.findOne({ name: 'sudoku-metrics' })
      if (!metric) {
        await this.metricsModel.create({
          name: 'sudoku-metrics',
          visits: 1,
          downloads: 0
        })
        return
      }
      metric.visits++
      metric.save()
      console.log('visit added! count is => ', metric.visits)
    } catch (error) {
      console.log('error adding visit to db => ', error)
    }
  }

  async addDownload() {
    try {
      const metric = await this.metricsModel.findOne({ name: 'sudoku-metrics' })
      if (!metric) {
        await this.metricsModel.create({
          name: 'sudoku-metrics',
          visits: 1,
          downloads: 1
        })
        return
      }
      metric.downloads++
      metric.save()
    } catch (error) {
      console.log('error adding download to db => ', error)
    }
  }

  async getDownloads() {
    try {
      const metric = await this.metricsModel.findOne({ name: 'sudoku-metrics' })
      if (!metric) return 0
      console.log('numof downloads is => ', metric.downloads)
      return metric.downloads
    } catch (error) {
      console.log('error fetching downloads from db => ', error)
    }
  }
}
