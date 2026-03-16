import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private base = this.alphabet.length;

  encodeUrl(id : number): string {
    let shortUrl = '';
    while (id > 0) {
      const index = id % this.base;
      shortUrl = this.alphabet.charAt(index) + shortUrl;
      id = Math.floor(id / this.base);
    }
    return shortUrl;
  }

  decodeUrl(shortUrl: string): number {
    let id = 0;
    for (let i = 0; i < shortUrl.length; i++) {
      const index = this.alphabet.indexOf(shortUrl.charAt(i));
      id = id * this.base + index;
    }
    return id;
  }
}
