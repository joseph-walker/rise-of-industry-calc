import { Monad } from 'util/Algebra';

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

	public ap<U>(eitherFn: Either<L, (x: R) => U>): Either<L, U> {
		if (this.isRight() && eitherFn.isRight())
			return Either.Right(eitherFn.right(this.right));

		return Either.Left(this.left);
	}

	public chain<U>(fn: (x: R) => Either<L, U>): Either<L, U> {
		if (this.isRight())
			return fn(this.right);

		return Either.Left(this.left);
	}
}
