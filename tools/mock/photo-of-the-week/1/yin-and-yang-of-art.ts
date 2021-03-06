import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class YinAndYangOfArt extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'yin-and-yang-of-art';
  title = 'Yin and Yang of Art';
  description = `Graffiti reaches the natural world`;
  keywords = [
    'The Tunnel to Nowhere',
    'Bryson City',
    'North Carolina',
    'Bridge',
    'Nature',
    'Graffiti',
    'Art',
    'Pathway',
    'Beauty',
  ];
  dateCreated = new Date(2019, 3, 28).toISOString().substring(0, 10);
  datePublished = new Date(2019, 3, 28).toISOString().substring(0, 10);
  location = {
    place: 'The Tunnel to Nowhere',
    city: 'Bryson City',
    stateOrProvince: 'North Carolina',
    country: 'United States',
  };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new YinAndYangOfArt();
  }
}
