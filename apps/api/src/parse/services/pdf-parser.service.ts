import { Injectable } from '@nestjs/common';
import { ParsedDocument } from './document-parser.types';

type LiteparsePage = { pageNum: number; textItems: { length: number } };
type LiteparseResult = {
  text: string;
  pages?: LiteparsePage[];
};

@Injectable()
export class PdfParserService {
  /**
   * LiteParse is ESM-only; Nest default output is CommonJS.
   * Use a lazy dynamic import so the server can run in CJS (incl. Vercel Node runtime).
   */
  private parserPromise: Promise<{
    parse: (input: Buffer | Uint8Array) => Promise<LiteparseResult>;
  }> | null = null;

  private async getParser(): Promise<{
    parse: (input: Buffer | Uint8Array) => Promise<LiteparseResult>;
  }> {
    if (!this.parserPromise) {
      this.parserPromise = import('@llamaindex/liteparse').then(
        ({ LiteParse }) => {
          const parser = new LiteParse();
          return parser as unknown as {
            parse: (input: Buffer | Uint8Array) => Promise<LiteparseResult>;
          };
        },
      );
    }
    return this.parserPromise;
  }

  async parse(input: Buffer | Uint8Array): Promise<ParsedDocument> {
    const parser = await this.getParser();
    const result = await parser.parse(input);

    return {
      text: result.text,
      pages: (result.pages ?? []).map((p) => ({
        pageNum: p.pageNum,
        textItemsCount: p.textItems.length,
      })),
    };
  }
}
