import { Controller, Get, Post, Param, Redirect, Body,BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './url.service';
import { Url } from './generated/prisma/client';

@Controller()
export class AppController {
  private count: number = 0;

  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService
  ) {
    this.initializeCount();
  }

  private async initializeCount() {
    this.count = await this.urlService.count();
  }

  @Get()
  async getAll(): Promise<Url[]> {
    return this.urlService.getAllUrl();
  }

  @Post()
  async createUrl(
    @Body() urlData:{ url: string}
  ) : Promise<Url> {
    const {url} = urlData;

    const normalizedUrl = this.appService.normalizeUrl(url);

    try {
      const urlExists = await this.appService.isExistingUrl(normalizedUrl);
      if (!urlExists) {
        throw new BadRequestException('URL does not exist or is unreachable.');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }

    const existingUrl = await this.urlService.url({ url: normalizedUrl });
    if (existingUrl) {
      return existingUrl;
    }

    this.count++;

    const shortenUrl = this.appService.encodeUrl(this.count);
    return this.urlService.createUrl({
      url : normalizedUrl,
      shorten_url: shortenUrl,
      count : 0
    })
  }

  @Get("/:shortUrl")
  @Redirect()
  async redirect(@Param("shortUrl") shortUrl: string) {
    const id = this.appService.decodeUrl(shortUrl);
    const url = await this.urlService.url({ id });
    if (url) {
      await this.urlService.incrementCount(id);
      return { url: url.url };
    } else {
      return { url: "/" };
    }
  }
}
