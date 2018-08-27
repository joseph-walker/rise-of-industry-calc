import { unnest, reduceRight as foldr } from 'ramda';

import { Monad, isFunction } from 'util/Algebra';

export class List<T> implements Monad<T> {
	private constructor (readonly values: T[]) {
		//
	}

	public static of<T>(value: T): List<T> {
		return new List([value]);
	}

	public static fromArray<T>(values: T[]): List<T> {
		return new List(values);
	}

	public static pure<T>(x: T): List<T> {
		return List.fromArray([x]);
	}

	public cons(x: T): List<T> {
		return new List([x].concat(this.values));
	}

	public foldr<U>(fn: (elem: T, acc: U) => U, acc: U): U {
		// This is cheating
		return foldr(fn, acc, this.values);
	}

	public toArray(): T[] {
		return this.values;
	}

	public map<U>(fn: (x: T) => U): List<U> {
		return new List(this.values.map(fn));
	}

	public ap<U, V>(x: List<U>): List<V> {
		let result = [];

		const fns = this.values;

		for (let fn of fns) {
			for (let value of x.values) {

				if (isFunction<U, V>(fn))
					result.push(fn(value));
				else
					throw new Error(`Type Constraint Failure: Expected ${value} to be function, got ${typeof value}`);
			}
		}

		return List.fromArray(result);
	}

	public chain<U>(fn: (x: T) => List<U>): List<U> {
		const values = unnest(this.values.map(y => fn(y).values));

		return List.fromArray(values);
	}
}
