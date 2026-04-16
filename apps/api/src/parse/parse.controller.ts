import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentParserService } from './services/document-parser.service';

@Controller('parse')
export class ParseController {
  constructor(private readonly documentParser: DocumentParserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async parse(
    @UploadedFile(
      new ParseFilePipe({
        // File type routing/validation is handled by DocumentParserService.
        validators: [new MaxFileSizeValidator({ maxSize: 25 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const parsed = await this.documentParser.parse({
      buffer: file.buffer,
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size,
    });

    return {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      ...parsed,
    };
  }
}
