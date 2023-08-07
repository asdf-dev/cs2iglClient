export type ServiceResponse<T> = {
  ok: boolean;
  data: T | null;
  error: string[];
};
