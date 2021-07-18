import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, mapTo, Observable } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  setIsProcessing$(
    entityType: EntityType,
    id: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map((documentModel) =>
        this.entityProvider.validateEntityType(entityType, documentModel)
      ),
      concatMapTo(
        from(this.entityModel.findByIdAndUpdate(id, { isProcessing }))
      ),
      mapTo(undefined)
    );
  }

  findIsProcessing$(entityType: EntityType, id: string): Observable<boolean> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map((documentModel) =>
        this.entityProvider.validateEntityType(entityType, documentModel)
      ),
      map((documentModel) => documentModel.isProcessing)
    );
  }
}
