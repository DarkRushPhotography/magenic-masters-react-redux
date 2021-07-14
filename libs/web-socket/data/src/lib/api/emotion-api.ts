import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Emotion } from '@dark-rush-photography/shared/types';
import { EmotionMessage } from '@dark-rush-photography/web-socket/types';

export const createOrUpdateEmotion$ = (
  drpApiUrl: string,
  httpService: HttpService,
  accessToken: string,
  emotionMessage: EmotionMessage
): Observable<EmotionMessage> => {
  const url = `${drpApiUrl}/admin/v1/emotion`;
  Logger.log(url, createOrUpdateEmotion$.name);
  return httpService
    .post<Emotion>(
      url,
      {
        ...emotionMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data as EmotionMessage));
};
