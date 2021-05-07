import { Event, Month } from '@dark-rush-photography/shared-types';

export class SSPCAnnualGolfInvitational2018 implements Event {
  slug = 'sspc-annual-golf-invitational-2018';
  group = 2018;
  title = 'SSPC Annual Golf Invitational 2018';
  description = ``;
  keywords = new Set<string>([]);
  dateCreated = { month: Month.October, day: 14, year: 2018 };
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new SSPCAnnualGolfInvitational2018();
  }
}