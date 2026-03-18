import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

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

  async isExistingUrl(url: string): Promise<{urlExist : boolean; finalUrl: string}> {
    try {
      const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      const finalUrl = response.url || url;
      return {urlExist: response.ok, finalUrl};
    } catch (error) {
      console.error(`Error checking URL existence: ${error}`);
      return {urlExist :false, finalUrl: url}; 
    }
  }

  normalizeUrl(url: string): string {
    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }
    return url;
  }
}
