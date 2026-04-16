import type { ParsedDocument } from './document-parser.types';

export class PdfParserService {
  /**
   * LiteParse is ESM-only.
   * Use a lazy dynamic import so it works in Next.js Node runtime.
   */
  private parserPromise: Promise<{ parse: (input: Buffer | Uint8Array) => any }> | null =
    null;

  private async getParser(): Promise<{ parse: (input: Buffer | Uint8Array) => any }> {
    if (!this.parserPromise) {
      this.parserPromise = import('@llamaindex/liteparse').then(({ LiteParse }) => {
        const parser = new LiteParse();
        return parser as unknown as { parse: (input: Buffer | Uint8Array) => any };
      });
    }
    return this.parserPromise;
  }

  async parse(input: Buffer | Uint8Array): Promise<ParsedDocument> {
    const parser = await this.getParser();
    const result = await parser.parse(input);

    return {
      text: result.text,
      pages: (result.pages ?? []).map((p: any) => ({
        pageNum: p.pageNum,
        textItemsCount: p.textItems.length,
      })),
    };
  }
}

