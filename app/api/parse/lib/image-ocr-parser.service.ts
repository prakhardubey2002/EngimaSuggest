import type { ParsedDocument } from './document-parser.types';

type OcrWorker = {
  recognize: (img: Buffer) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
};

export class ImageOcrParserService {
  private workerPromise: Promise<OcrWorker> | null = null;

  private async getWorker(): Promise<OcrWorker> {
    if (!this.workerPromise) {
      this.workerPromise = (async () => {
        const { createWorker } = await import('tesseract.js');

        const base =
          process.env.TESSERACT_CDN_BASE?.replace(/\/+$/, '') ?? 'https://unpkg.com';
        const workerPath =
          process.env.TESSERACT_WORKER_PATH ??
          `${base}/tesseract.js@7.0.0/dist/worker.min.js`;
        const corePath =
          process.env.TESSERACT_CORE_PATH ??
          `${base}/tesseract.js-core@5.1.1/tesseract-core-simd.wasm.js`;
        const langPath =
          process.env.TESSERACT_LANG_PATH ??
          `${base}/tesseract.js@7.0.0/dist/lang-data`;

        const worker = (await createWorker('eng', undefined, {
          workerPath,
          corePath,
          langPath,
        })) as unknown as OcrWorker;

        return worker;
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

