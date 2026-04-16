export class ParseApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(args: { message: string; status: number; payload?: unknown }) {
    super(args.message);
    this.name = 'ParseApiError';
    this.status = args.status;
    this.payload = args.payload ?? { message: args.message };
  }
}

