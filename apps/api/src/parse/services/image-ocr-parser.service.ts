import { Injectable } from '@nestjs/common';
import { ParsedDocument } from './document-parser.types';

@Injectable()
export class ImageOcrParserService {
  /**
   * WASM-based OCR for serverless (no ImageMagick needed).
   * Cache the worker across warm invocations.
   */
  private workerPromise: Promise<{
    recognize: (img: Buffer) => Promise<{ data: { text: string } }>;
    terminate: () => Promise<void>;
  }> | null = null;

  private async getWorker() {
    if (!this.workerPromise) {
      this.workerPromise = (async () => {
        const { createWorker } = await import('tesseract.js');
        /**
         * Vercel's bundler may not include tesseract.js-core WASM files from node_modules,
         * which causes ENOENT at runtime. Point worker/core/lang to CDN-hosted assets.
         *
         * If you want to self-host instead, copy these assets into /public and set the
         * env vars below to your own URLs.
         */
        const base =
          process.env.TESSERACT_CDN_BASE?.replace(/\/+$/, '') ??
          'https://unpkg.com';
        const workerPath =
          process.env.TESSERACT_WORKER_PATH ??
          `${base}/tesseract.js@7.0.0/dist/worker.min.js`;
        const corePath =
          process.env.TESSERACT_CORE_PATH ??
          `${base}/tesseract.js-core@5.1.1/tesseract-core-simd.wasm.js`;
        const langPath =
          process.env.TESSERACT_LANG_PATH ??
          `${base}/tesseract.js@7.0.0/dist/lang-data`;

        const worker = await createWorker('eng', undefined, {
          workerPath,
          corePath,
          langPath,
        });
        return worker as unknown as {
          recognize: (img: Buffer) => Promise<{ data: { text: string } }>;
          terminate: () => Promise<void>;
        };
      })();
    }
    return this.workerPromise;
  }

  async parse(input: Buffer): Promise<ParsedDocument> {
    const worker = await this.getWorker();
    const res = await worker.recognize(input);
    return { text: res.data.text || '' };
  }
}
