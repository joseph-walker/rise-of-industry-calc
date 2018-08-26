import { reduceRight as foldr } from 'ramda';

import { Monad } from 'util/Algebra';

export class List<T> implements Monad<T> {
	private constructor (readonly values: T[]) {
		//
	}

	static fromArray<T>(values: T[]): List<T> {
		return new List(values);
	}

	static pure<T>(): List<T> {
		return List.fromArray([]);
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

	public ap<U>(fns: List<(x: T) => U>): List<U> {
		let result = [];

		for (let fn of fns.toArray()) {
			for (let value of this.values) {
				result.push(fn(value));
			}
		}

		return List.fromArray(result);
	}

	public chain<U>(fn: (x: T) => List<U>): List<U> {
		return List.fromArray([].concat([], this.values.map(fn)));
	}
}
