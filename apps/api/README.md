# Document Parsing API (LiteParse + NestJS)

This project exposes a single API that accepts **PDF / DOCX / images / TXT / LaTeX (.tex)** and returns extracted text.

Vercel serverless note:

- **PDF** uses LiteParse and works in serverless.
- **DOCX** is parsed via `mammoth` (serverless-friendly).
- **Images** are parsed via `tesseract.js` (WASM OCR, serverless-friendly).
- **Vercel note for images**: set OCR assets to load from CDN (WASM/worker/lang) to avoid missing `.wasm` files in serverless bundles.
- **DOC (legacy)** is **not supported** on Vercel serverless without native converters.

## Run

```bash
npm install
npm run start:dev
```

API base URL (default): `http://localhost:3000`

## Endpoint

### `POST /parse`

- **Content-Type**: `multipart/form-data`
- **Field name**: `file`
- **Supported file types**:
  - `application/pdf` (`.pdf`)
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (`.docx`)
  - `image/*` (png/jpg/webp/etc)
  - `text/plain` (`.txt`)
  - `text/x-tex` / `application/x-tex` (`.tex`)
- **Max file size**: 25 MB
- **Note for `.doc`**: legacy `.doc` requires native converters (LibreOffice). On Vercel serverless, upload `.docx` or convert to `.pdf`.

## Vercel environment variables (image OCR)

If you see errors like missing `tesseract-core-*.wasm` on Vercel, set these env vars (Project → Settings → Environment Variables):

- `TESSERACT_CDN_BASE`: `https://unpkg.com` (default)
- `TESSERACT_WORKER_PATH`: `https://unpkg.com/tesseract.js@7.0.0/dist/worker.min.js`
- `TESSERACT_CORE_PATH`: `https://unpkg.com/tesseract.js-core@5.1.1/tesseract-core-simd.wasm.js`
- `TESSERACT_LANG_PATH`: `https://unpkg.com/tesseract.js@7.0.0/dist/lang-data`

#### Example (curl)

```bash
curl -F "file=@./document.pdf" http://localhost:3000/parse
```

#### Example response (shape)

```json
{
  "filename": "document.pdf",
  "mimetype": "application/pdf",
  "size": 12345,
  "text": "Full extracted text...",
  "pages": [
    { "pageNum": 1, "textItemsCount": 240 },
    { "pageNum": 2, "textItemsCount": 198 }
  ]
}
```

## Sample UI

Open `samle/index.html` to upload a file and see the API response rendered in the browser.
