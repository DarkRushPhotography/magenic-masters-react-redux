import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';

import { About, DocumentType } from '@dark-rush-photography/shared-types';
import {
  AboutProvider,
  DocumentModel,
  Document,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminAboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  create$(slug: string): Observable<About> {
    return from(
      this.aboutModel.findOne({ type: DocumentType.About, slug })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(new this.aboutModel(this.aboutProvider.newAbout(slug)).save())
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.aboutProvider.fromDocumentModel)
    );
  }

  findAll$(): Observable<About[]> {
    return from(this.aboutModel.find({ type: DocumentType.About })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.aboutProvider.fromDocumentModel),
      toArray<About>()
    );
  }

  findOne$(id: string): Observable<About> {
    return from(this.aboutModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.aboutProvider.fromDocumentModel)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
