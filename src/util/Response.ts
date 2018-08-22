import { Monad } from './Algebra';

enum ResponseType {
	Loading = 'RESPONSE_LOADING',
	Ready = 'RESPONSE_READY',
	Error = 'RESPONSE_ERROR'
}

export interface ResponsePatternMatch<T, E, U> {
	loading: () => U,
	ready: (x: T) => U,
	error: (e: E) => U
}

export class Response<T, E> implements Monad<T> {
	constructor(readonly type: ResponseType, readonly value: T, readonly err: E) {
		//
	}

	static Loading(): Response<any, any> {
		return new Response(ResponseType.Loading, null, null);
	}

	static Ready<T>(value: T): Response<T, any> {
		return new Response(ResponseType.Ready, value, null);
	}

	static Error<E>(err: E): Response<any, E> {
		return new Response(ResponseType.Error, null, err);
	}

	public isLoading() {
		return this.type === ResponseType.Loading;
	}

	public isReady() {
		return this.type === ResponseType.Ready;
	}

	public isError() {
		return this.type === ResponseType.Error;
	}

	public map<U>(fn: (x: T) => U): Response<U, E> {
		if (this.isReady())
			return Response.Ready(fn(this.value));
		else if (this.isError())
			return Response.Error(this.err);

		return Response.Loading();
	}

	public pure(x: T): Response<T, E> {
		return Response.Ready(x);
	}

	public ap<U>(responseFn: Response<(x: T) => U, E>): Response<U, E> {
		if (this.isReady()) {
			if (responseFn.isReady()) {
				return Response.Ready(responseFn.value(this.value));
			}
			else if (responseFn.isError()) {
				return Response.Error(responseFn.err);
			}
		}
		else if (this.isError()) {
			return Response.Error(this.err);
		}

		return Response.Loading();
	}

	public chain<U>(fn: (x: T) => Response<U, E>): Response<U, E> {
		if (this.isReady())
			return fn(this.value);
		else if (this.isError())
			return Response.Error(this.err);

		return Response.Loading();
	}

	public with<U>(patterns: ResponsePatternMatch<T, E, U>): U {
		if (this.isReady())
			return patterns.ready(this.value);
		else if (this.isError())
			return patterns.error(this.err);

		return patterns.loading();
	}
}
