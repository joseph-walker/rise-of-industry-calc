import { Functor } from './Functor';

export enum Type {
	Loading = 'RESPONSE_LOADING',
	Error = 'RESPONSE_ERROR',
	Ready = 'RESPONSE_READY'
}

export class Loading implements Functor<any> {
	readonly type: Type.Loading = Type.Loading;

	static new() {
		return new Loading();
	}

	public map(_: any) {
		return new Loading();
	}
}

export class Error<E> implements Functor<E> {
	readonly type: Type.Error = Type.Error;

	constructor(readonly err: E) {
		//
	}

	static new<T>(err: T): Error<T> {
		return new Error(err);
	}

	public map(_: any) {
		return new Error(this.err);
	}
}

export class Ready<A> implements Functor<A> {
	readonly type: Type.Ready = Type.Ready;

	constructor(readonly data: A) {
		//
	}

	static new<T>(err: T): Ready<T> {
		return new Ready(err);
	}

	public map<B>(fn: (x: A) => B): Ready<B> {
		return new Ready(fn(this.data));
	}
}

export type Response<A, E>
	= Loading
	| Error<E>
	| Ready<A>

export const Response = {
	Type,
	Loading,
	Error,
	Ready
};
