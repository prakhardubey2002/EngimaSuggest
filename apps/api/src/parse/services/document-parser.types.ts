export type ParsedDocument = {
  text: string;
  pages?: Array<{
    pageNum: number;
    textItemsCount: number;
  }>;
};

export type UploadedDoc = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
};
