import { List } from 'util/List';

export interface Functor<T> {
	map<U>(fn: (x: T) => U): Functor<U>
}

export interface Applicative<T> extends Functor<T> {
	ap<U>(fn: Applicative<(x: T) => U>): Applicative<U>
}

export interface Monad<T> extends Applicative<T> {
	chain<U>(fn: (x: T) => Monad<U>): Monad<U>
}

export function liftA2<T, U, V>(fn: (x: T) => (y: U) => V, fT: Applicative<T>, fU: Applicative<U>): Applicative<V> {
	return fU.ap(fT.map(fn) as Applicative<(y: U) => V>);
}

export function traverse<T, U>(pure: (x: List<U>) => Applicative<List<U>>, fn: (x: T) => Applicative<U>, xs: List<T>): Applicative<List<U>> {
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
