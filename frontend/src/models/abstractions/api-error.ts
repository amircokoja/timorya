export type ApiError = CustomApiError | ProblemDetails;

export interface CustomApiError {
  code: string;
  name: string;
}

export interface ProblemDetails {
  title: string;
  type: string;
  detail: string;
  status: number;
  errors: ProblemDetailsError[];
}

interface ProblemDetailsError {
  propertyName: string;
  errorMessage: string;
}
