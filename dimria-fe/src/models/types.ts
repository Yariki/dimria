

export interface Action<T> {
    type: string;
    payload: T;
}

export interface Response<T> {
    status: number;
    data?: T;
}


