import { List } from 'util/List';

export type PureConstructor<T> = (x: T) => Applicative<T>

export type LiftableA2<T, U, V> = (x: T) => (y: U) => V;

export interface Functor<T> {
	map<U>(fn: (x: T) => U): Functor<U>
}

export interface Applicative<T> extends Functor<T> {
	ap<U, V>(x: Applicative<U>): Applicative<V>
}

export interface Monad<T> extends Applicative<T> {
	chain<U>(fn: (x: T) => Monad<U>): Monad<U>
}

export function isFunction<T, U>(x: any): x is (x: T) => U {
	return typeof x === 'function';
}

export function liftA2<T, U, V>(fn: LiftableA2<T, U, V>, fT: Applicative<T>, fU: Applicative<U>): Applicative<V> {
	return (fT.map(fn) as Applicative<(x: U) => V>).ap(fU);
}

export function traverse<T, U>(pure: PureConstructor<List<U>>, fn: (x: T) => Applicative<U>, xs: List<T>): Applicative<List<U>> {
	// a -> [a] -> [a]
	function consL(x: U) {
		return function (xs: List<U>) {
			return xs.cons(x);
		}
	}

	// Applicative f => a -> f [a] -> f [a]
	function consF(x: T, ys: Applicative<List<U>>): Applicative<List<U>> {
		return liftA2(consL, fn(x), ys);
	}

	return xs.foldr(consF, pure(List.fromArray<U>([])));
}
