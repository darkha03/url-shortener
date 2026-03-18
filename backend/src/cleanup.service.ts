import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UrlService } from "./url.service";

@Injectable()
export class CleanupService {
    constructor(private urlService: UrlService) {}

    @Cron('0 0 * * *') // Runs every day at midnight
    async handleCron() {
        await this.urlService.deleteExpiredUrls();
    }
}