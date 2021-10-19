"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetController = void 0;
const common_1 = require("@nestjs/common");
const tweet_service_1 = require("./tweet.service");
const create_tweet_dto_1 = require("./dto/create-tweet.dto");
const update_tweet_dto_1 = require("./dto/update-tweet.dto");
const swagger_1 = require("@nestjs/swagger");
let TweetController = class TweetController {
    constructor(tweetService) {
        this.tweetService = tweetService;
    }
    create(createTweetDto) {
        return this.tweetService.create(createTweetDto);
    }
    findAll() {
        return this.tweetService.findAll();
    }
    findOne(id) {
        return this.tweetService.findOne(+id);
    }
    update(id, updateTweetDto) {
        return this.tweetService.update(+id, updateTweetDto);
    }
    remove(id) {
        return this.tweetService.delete(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tweet_dto_1.CreateTweetDto]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tweet_dto_1.UpdateTweetDto]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "remove", null);
TweetController = __decorate([
    (0, swagger_1.ApiTags)('Tweet'),
    (0, common_1.Controller)('tweet'),
    __metadata("design:paramtypes", [tweet_service_1.TweetService])
], TweetController);
exports.TweetController = TweetController;
//# sourceMappingURL=tweet.controller.js.map