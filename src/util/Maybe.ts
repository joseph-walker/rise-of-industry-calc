import { Monad } from './Algebra';

enum MaybeType {
	Just = 'MAYBE_JUST',
	Nothing = 'MAYBE_NOTHING'
}

export interface MaybePatternMatch<T, U> {
	just: (x: T) => U,
	nothing: () => U
}

export class Maybe<T> implements Monad<T> {
	private constructor (readonly type: MaybeType, readonly value: T) {
		//
	}

	public static Just<T>(value: T): Maybe<T> {
		return new Maybe(MaybeType.Just, value);
	}

	public static Nothing<T>(): Maybe<T> {
		return new Maybe(MaybeType.Nothing, null);
	}

	static pure<T>(x: T): Maybe<T> {
		return Maybe.Just(x);
	}

	public isJust() {
		return this.type === MaybeType.Just;
	}

	public isNothing() {
		return this.type === MaybeType.Nothing;
	}

	public withDefault(defaultValue: T): T {
		if (this.isJust())
			return this.value;

		return defaultValue;
	}

	public map<U>(fn: (x: T) => U): Maybe<U> {
		if (this.isJust())
			return Maybe.Just(fn(this.value));

		return Maybe.Nothing();
	}

	public ap<U>(maybeFn: Maybe<(x: T) => U>): Maybe<U> {
		if (this.isJust() && maybeFn.isJust())
			return Maybe.Just(maybeFn.value(this.value));

		return Maybe.Nothing();
	}

	public chain<U>(fn: (x: T) => Maybe<U>): Maybe<U> {
		if (this.isJust())
			return fn(this.value);

		return Maybe.Nothing();
	}

	public with<U>(patterns: MaybePatternMatch<T, U>): U {
		if (this.isJust())
			return patterns.just(this.value);

		return patterns.nothing();
	}
}