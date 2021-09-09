export type DebouncedPromise<T, V> = {
  /** The value to be used by the debounced batch execute function */
  value: V;
  /** The function to resolve the promise for this batched promise */
  resolve: (value: T) => void;
  /** The function to reject the promise for this batched promise */
  reject: (err: Error) => void;
};

export type DebouncedBucket = {
  /** Timer for the execution of the batch */
  timer?: number;
  /** Batch of debounced promises to be executed after the timeout */
  batch?: DebouncedPromise<any, any>[];
};

/**
 * Batches individual calls and their value and executes them after a timeout
 */
export function batchDebounce<T, V>(args: {
  /** The value to be used by the execute function for this individual call */
  value: V;
  /** The stateful/shared bucket between different calls to store the batched items and timer */
  bucket: DebouncedBucket;
  /** Timeout after which the execute function should be called */
  timeout: number;
  /** Function to execute the batch and map values to the given promise/values */
  execute: (batch: DebouncedPromise<T, V>[]) => Promise<void>;
}): Promise<T> {
  return new Promise((resolve, reject) => {
    clearTimeout(args.bucket.timer);

    const batch = args.bucket.batch ?? [];

    batch.push({ value: args.value, reject, resolve });

    args.bucket.batch = batch;

    args.bucket.timer = setTimeout(() => {
      args.bucket.timer = undefined;
      args.bucket.batch = [];

      args.execute(batch).catch((err) => {
        batch.forEach((debounced) => debounced.reject(err));
      });
    }, args.timeout) as any; // we use "any" as the return type is incorrect
  });
}

/**
 * 
 * export function api({ httpClient }: APIConfiguration) {
	const getManyBucket: DebouncedBucket = {};

	return {
		async get(): Promise<any> {
			return batchDebounce({
				value: '',
				bucket: getManyBucket,
				timeout: 10,
				async execute(batch) {
					let result = { props: 0 };

					try {
						const response = await endpoint...

						result = response.data.data;
					} catch (err) {
					
					}

					batch.forEach((item) => {
						item.resolve(result);
					});
				},
			});
		},
	};
}
 */
