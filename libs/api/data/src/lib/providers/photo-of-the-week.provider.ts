import { Injectable } from '@nestjs/common';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { CommentProvider } from './comment.provider';
import { EmotionProvider } from './emotion.provider';

@Injectable()
export class PhotoOfTheWeekProvider {
  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly commentProvider: CommentProvider,
    private readonly emotionProvider: EmotionProvider
  ) {}

  fromDocumentModel(documentModel: DocumentModel): PhotoOfTheWeek {
    return {
      id: documentModel._id,
      group: documentModel.group,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
      datePublished: documentModel.datePublished,
      location: documentModel.location,
      useTileImage: documentModel.useTileImage,
      text: documentModel.text,
      images: documentModel.images.map((image) =>
        this.imageProvider.toImage(image)
      ),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        this.imageDimensionProvider.toImageDimension(imageDimension)
      ),
      comments: documentModel.comments.map((comment) =>
        this.commentProvider.toComment(comment)
      ),
      emotions: documentModel.emotions.map((emotion) =>
        this.emotionProvider.toEmotion(emotion)
      ),
    };
  }
}