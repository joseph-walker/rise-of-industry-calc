export interface Functor<T> {
	map<U>(fn: (x: T) => U): Functor<U>
}

export interface Applicative<T> extends Functor<T> {
	pure(x: T): Applicative<T>,
	ap<U>(fn: Applicative<(x: T) => U>): Applicative<U>
}

export interface Monad<T> extends Applicative<T> {
	chain<U>(fn: (x: T) => Monad<U>): Monad<U>
}
