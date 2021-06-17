import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Review } from '@dark-rush-photography/shared-types';
import { ReviewRequestDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminReviewService } from './admin-review.service';

@Controller('admin/v1/review')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Review')
export class AdminReviewController {
  constructor(private readonly adminReviewService: AdminReviewService) {}

  @Roles(ADMIN)
  @Post()
  create$(@Body() review: ReviewRequestDto): Observable<Review> {
    return this.adminReviewService.create$(review);
  }

  @Roles(ADMIN)
  @Put(':id')
  update$(
    @Param('id') id: string,
    @Body() review: ReviewRequestDto
  ): Observable<Review> {
    return this.adminReviewService.update$(id, review);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminReviewService.delete$(id);
  }
}