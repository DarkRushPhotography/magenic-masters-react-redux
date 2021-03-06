import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  SocialMedia,
  SocialMediaAdminDto,
  SocialMediaCreateDto,
  SocialMediaUpdateDto,
} from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminSocialMediaService } from './admin-social-media.service';

@Controller({ path: 'admin/social-media', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Social Media')
export class AdminSocialMediaController {
  constructor(
    private readonly adminSocialMediaService: AdminSocialMediaService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: SocialMediaAdminDto })
  create$(
    @Body() socialMediaCreate: SocialMediaCreateDto
  ): Observable<SocialMedia> {
    return this.adminSocialMediaService.create$(socialMediaCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: SocialMediaUpdateDto })
  update$(
    @Param('id') id: string,
    @Body() socialMediaUpdate: SocialMediaUpdateDto
  ): Observable<SocialMedia> {
    return this.adminSocialMediaService.update$(id, socialMediaUpdate);
  }

  @Get()
  @ApiOkResponse({ type: [SocialMediaAdminDto] })
  findAll$(): Observable<SocialMedia[]> {
    return this.adminSocialMediaService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: SocialMediaAdminDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<SocialMedia> {
    return this.adminSocialMediaService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProcess$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminSocialMediaService.delete$(id);
  }
}
