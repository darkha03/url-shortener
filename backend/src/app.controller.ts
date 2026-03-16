import { Controller, Get, Post, Param, Redirect, Body } from '@nestjs/common';
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
    const {url} = urlData
    if (!this.appService.isValidUrl(url)) {
      throw new Error("Invalid URL");
    }
    const existingUrl = await this.urlService.url({ url });
    if (existingUrl) {
      return existingUrl;
    }
    this.count++;
    const shortenUrl = this.appService.encodeUrl(this.count);
    return this.urlService.createUrl({
      url : url,
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
      return { url: url.url };
    } else {
      return { url: "/" };
    }
  }
}
