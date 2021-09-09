import {
	camelCase,
	cloneDeep,
	forEach,
	isArray,
	isObject,
	mapKeys,
	mapValues,
	snakeCase,
} from 'lodash';

function mapKeysDeep(object: any, cb: any): any {
	if (isArray(object)) {
		forEach(object, (row, key) => {
			object[key] = isObject(row) ? mapKeysDeep(row, cb) : row;
		});

		return object;
	}

	return mapValues(mapKeys(object, cb), (val: any) => {
		return isObject(val) ? mapKeysDeep(val, cb) : val;
	});
}

function convertToCase<T>(
	object: Record<string, unknown>,
	caseFn: (string?: string | undefined) => string,
): T {
	const clone = cloneDeep(object);

	return mapKeysDeep(clone, (_o: Record<string, unknown>, key: any) => {
		return caseFn(key);
	});
}

export function convertToCamelCase<T>(object: Record<string, unknown>): T {
	return convertToCase(object, camelCase);
}

export function convertToSnakeCase<T>(object: Record<string, unknown>): T {
	return convertToCase(object, snakeCase);
}
