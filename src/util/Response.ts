import { Monad, isFunction } from 'util/Algebra';

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

	public static Loading(): Response<any, any> {
		return new Response(ResponseType.Loading, null, null);
	}

	public static Ready<T>(value: T): Response<T, any> {
		return new Response(ResponseType.Ready, value, null);
	}

	public static Error<E>(err: E): Response<any, E> {
		return new Response(ResponseType.Error, null, err);
	}

	public static pure<T, E>(x: T): Response<T, E> {
		return Response.Ready(x);
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

	public ap<U, V>(x: Response<U, E>): Response<V, E> {
		if (this.isReady() && x.isReady()) {
			if (isFunction<U, V>(this.value)) {
				const fn = this.value;

				return Response.Ready(fn(x.value));
			}
			else
				throw new Error(`Type Constraint Failure: Expected ${this.value} to be function, got ${typeof this.value}`);
		}
		else if (this.isError())
			return Response.Error(this.err);
		else if (this.isLoading())
			return Response.Loading();
		else if (x.isError())
			return Response.Error(x.err);

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
