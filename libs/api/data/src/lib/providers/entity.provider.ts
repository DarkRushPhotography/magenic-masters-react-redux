import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import {
  concatMap,
  concatMapTo,
  filter,
  from,
  map,
  mapTo,
  Observable,
  of,
} from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityType,
  validateEntityFound,
  validateEntityIsPublic,
  validateEntityNotAlreadyCreated,
  validateOneEntity,
  validateProcessingEntity,
  validateNotProcessingEntity,
  validateEntityCreate,
} from '../entities/entity-validation.functions';

@Injectable()
export class EntityProvider {
  //TODO: Put these in order of the validate file and check if all needed
  validateEntityFound(documentModel: DocumentModel | null): DocumentModel {
    return validateEntityFound(documentModel);
  }

  validateEntityType(
    entityType: EntityType,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateEntityType(entityType, documentModel);
  }

  validateOneEntity(documentModels: DocumentModel[]): DocumentModel {
    return validateOneEntity(documentModels);
  }

  validateEntityIsPublic(documentModel: DocumentModel): DocumentModel {
    return validateEntityIsPublic(documentModel);
  }

  validateProcessingEntity(documentModel: DocumentModel): DocumentModel {
    return validateProcessingEntity(documentModel);
  }

  validateNotProcessingEntity(documentModel: DocumentModel): DocumentModel {
    return validateNotProcessingEntity(documentModel);
  }

  validateEntityCreate(documentModel: DocumentModel): DocumentModel {
    return validateEntityCreate(documentModel);
  }

  create$(
    entityType: EntityType,
    group: string,
    slug: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findOne({ type: entityType, group, slug })).pipe(
      map(validateEntityNotAlreadyCreated)
    );
  }

  setIsProcessing$(
    entityType: EntityType,
    id: string,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMapTo(from(entityModel.findByIdAndUpdate(id, { isProcessing }))),
      mapTo(undefined)
    );
  }

  findAll$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.find({ type: entityType })).pipe(
      concatMap((documentModels) =>
        Array.isArray(documentModels)
          ? from(documentModels)
          : of(documentModels)
      )
    );
  }

  findOne$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel))
    );
  }

  findAllPublic$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.find({ type: entityType })).pipe(
      concatMap((documentModels) =>
        Array.isArray(documentModels)
          ? from(documentModels)
          : of(documentModels)
      ),
      filter((documentModel) => !documentModel.isPublic)
    );
  }

  findOnePublic$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => validateEntityType(entityType, documentModel))
    );
  }

  delete$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(id)).pipe(
      map((documentModel) =>
        documentModel
          ? validateEntityType(entityType, documentModel)
          : of(documentModel)
      ),
      concatMap((documentModel) =>
        documentModel ? from(entityModel.findByIdAndDelete(id)) : of()
      ),
      mapTo(undefined)
    );
  }
}
