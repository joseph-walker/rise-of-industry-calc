interface Functor<A> {
	map<B>(fn: (x: A) => B): Functor<B>
}

export enum Type {
	Just,
	Nothing
}

export class Just<A> implements Functor<A> {
	readonly type: Type.Just = Type.Just;

	constructor(readonly data: A) {
		//
	}

	static new<T>(data: T): Just<T> {
		return new Just(data);
	}

	public map<B>(fn: (x: A) => B): Just<B> {
		return new Just(fn(this.data));
	}
}

export class Nothing implements Functor<any> {
	readonly type: Type.Nothing = Type.Nothing;

	static new() {
		return new Nothing();
	}

	public map(_: any) {
		return new Nothing();
	}
}

export type Maybe<T>
	= Just<T>
	| Nothing

export const Maybe = {
	Type,
	Just,
	Nothing
}
