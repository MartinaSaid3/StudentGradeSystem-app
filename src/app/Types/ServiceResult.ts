export interface ServiceResult<T> {
    success: boolean;
    message: string;
    data: T | null;
}