import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ReviewMediaProvider,
} from '@dark-rush-photography/api/data';
import { ReviewMediaController } from './review-media.controller';
import { ReviewMediaService } from './review-media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [ReviewMediaController],
  providers: [ReviewMediaProvider, ReviewMediaService],
})
export class ReviewMediaModule {}