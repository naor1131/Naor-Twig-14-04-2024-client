import { v4 as uuidv4 } from "uuid";

interface IError {
  id: string;
  code?: number;
  message?: string;
  severity?: number;
  timestamp: Date;
}

export interface IErrorReport {
  message: string;
  code?: number;
  severity?: number;
}
class ErrorService {
  private isConnected: boolean;
  private errors: Map<string, IError>;

  constructor() {
    this.isConnected = false;
    this.errors = new Map();
  }

  getIsConnected(): boolean {
    return this.isConnected;
  }

  getErrors(errorIDs?: string[]): IError[] {
    if (!errorIDs) {
      return Object.values(this.errors);
    }

    return Object.values(this.errors).filter((err: IError) => errorIDs?.includes(err.id));
  }

  pushError(errorReport: IErrorReport): string {
    const messageID = uuidv4();

    const ErrorMessage: IError = {
      id: messageID,
      code: errorReport.code,
      message: errorReport.message,
      severity: errorReport.severity,
      timestamp: new Date(),
    };

    // add the new error.
    this.errors = new Map(this.errors).set(messageID, ErrorMessage);

    return messageID;
  }

  removeError(errorId: string): void {
    // Delete the error from the state.
    const updatedErrors = new Map(this.errors);
    updatedErrors.delete(errorId);
    this.errors = updatedErrors;
  }

  clearErrors(): void {
    this.errors = new Map();
  }
}

export default new ErrorService();
