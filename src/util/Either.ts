import { Monad, isFunction } from 'util/Algebra';

enum EitherType {
	Left = 'EITHER_LEFT',
	Right = 'EITHER_RIGHT'
}

export interface EitherPatternMatch<L, R, V> {
	left: (l: L) => V,
	right: (r: R) => V
}

export class Either<L, R> implements Monad<R> {
	private constructor (readonly type: EitherType, readonly left: L, readonly right: R) {
		//
	}

	public static Left<L, R>(value: L): Either<L, R> {
		return new Either(EitherType.Left, value, null);
	}

	public static Right<L, R>(value: R): Either<L, R> {
		return new Either(EitherType.Right, null, value);
	}

	public static pure<L, R>(x: R): Either<L, R> {
		return Either.Right(x);
	}

	public isLeft() {
		return this.type === EitherType.Left;
	}

	public isRight() {
		return this.type === EitherType.Right;
	}

	public map<U>(fn: (x: R) => U): Either<L, U> {
		if (this.isRight())
			return Either.Right(fn(this.right));

		return Either.Left(this.left);
	}

	public ap<U, V>(x: Either<L, U>): Either<L, V> {
		if (this.isRight() && x.isRight()) {
			if (isFunction<U, V>(this.right)) {
				const fn = this.right;

				return Either.Right(fn(x.right));
			}
			else
				throw new Error(`Type Constraint Failure: Expected Right value ${this.right} to be function, got ${typeof this.right}`);
		}
		if (this.isLeft())
			return Either.Left(this.left);

		return Either.Left(x.left);
	}

	public chain<U>(fn: (x: R) => Either<L, U>): Either<L, U> {
		if (this.isRight())
			return fn(this.right);

		return Either.Left(this.left);
	}
}
