﻿import sharp = require('sharp');
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import { StandardImageResolution } from '@dark-rush-photography/api/types';
import { createTempFile$ } from '../file/file.functions';

export const resizeExactFitImage$ = (
  fileName: string,
  filePath: string,
  standardImageResolution: StandardImageResolution
): Observable<string> => {
  const { width, height } = standardImageResolution.pixels;
  return createTempFile$(fileName).pipe(
    concatMap((newFilePath) =>
      combineLatest([
        of(newFilePath),
        from(
          sharp(filePath)
            .resize(width, height, {
              kernel: sharp.kernel.nearest,
              fit: 'contain',
              //TODO: Take the background color from env #1E1E1E
              background: { r: 255, g: 255, b: 255 },
            })
            .toFile(newFilePath)
        ),
      ])
    ),
    map(([newFilePath]) => newFilePath)
  );
};
