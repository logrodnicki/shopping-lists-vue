import { computed, onMounted, ref, Ref, watch } from 'vue';

const renderer = ref(0);

enum Statuses {
  'SUCCESS' = 'success',
  'ERROR' = 'error',
  'LOADING' = 'loading'
}

interface UseQuery<T> {
  data: T;
  error: string | null;
  status: Statuses;
  isLoading: boolean;
}

interface UseQueryState<T> {
  data: T | null;
  error: string | null;
  status: Statuses;
  isLoading: boolean;
}

interface UseQueryOptions {
  cacheTime: number;
}

interface GetQuery {
  queryHash: string;
  queryFunction: () => any;
  options?: UseQueryOptions;
}

interface Query<T> {
  state: UseQueryState<T>;
  queryHash: string;
  subscribers: Observer<T>[];
  subscribe: (subscriber: Observer<T>) => () => void;
  setState: (updater: (oldState: UseQueryState<T>) => UseQueryState<T>) => void;
  getState: () => UseQueryState<T>;
  fetch: () => Promise<void>;
}

interface QueryOptions {
  queryHash: string;
  queryFunction: () => any;
}

interface ObserverOptions {
  queryHash: string;
  queryFunction: () => any;
  cacheTime: number;
}

interface Client {
  getQuery: <T>(data: GetQuery) => any;
  getQueryByHash: (queryHash: string) => any;
}

interface Observer<T> {
  notify: () => void;
  getState: () => UseQueryState<T>;
  subscribe: (callback: () => void) => () => void;
  fetch: () => void;
}

class QueryClient implements Client {
  queries: Query<any>[];

  constructor() {
    this.queries = [];
  }

  getQuery = <T>({ queryHash, queryFunction }: GetQuery): Query<T> => {
    let query = this.queries.find(query => query.queryHash === queryHash) as Query<T>;

    if (!query) {
      query = createQuery({ queryHash, queryFunction });

      this.queries.push(query);
    }

    return query;
  };

  getQueryByHash = (queryHash: string): Query<any> | null => {
    return this.queries.find(query => query.queryHash === queryHash) || null;
  };
}

const createQueryObserver = <T>(
  client: Client,
  { queryHash, queryFunction, cacheTime }: ObserverOptions
) => {
  const query = client.getQuery<T>({ queryHash, queryFunction });

  let queryObserver: Observer<T> = {
    getState: () => query.getState(),
    notify: () => {},
    subscribe: (callback: () => void) => {
      queryObserver.notify = callback;
      const unsubscribe = query.subscribe(queryObserver);

      queryObserver.fetch();

      return unsubscribe;
    },
    fetch: () => {
      if (query.state.lastUpdated && Date.now() - query.state.lastUpdated <= cacheTime) {
        return;
      }

      query.fetch();
    }
  };

  return queryObserver;
};

const queryClient = new QueryClient();

const defaultOptions = {
  cacheTime: 1000 * 60 * 5
};

const useQuery = <T>(
  queryKey: string,
  queryFunction: () => void,
  { cacheTime = 500 }: UseQueryOptions = defaultOptions
): UseQuery<T> => {
  const rerender = () => {
    renderer.value++;
  };

  const currentQueryObserver = ref<Observer<T>>(
    createQueryObserver<T>(queryClient, { queryHash: queryKey, queryFunction, cacheTime })
  );
  const currentQueryState = ref<UseQueryState<T> | null>(
    currentQueryObserver.value.getState()
  ) as Ref<UseQueryState<T>>;

  onMounted(() => {
    currentQueryObserver.value.subscribe(rerender);
  });

  watch(renderer, () => {
    currentQueryState.value = currentQueryObserver.value.getState();
  });

  const isLoading = computed(() => currentQueryState?.value?.isLoading);
  const status = computed(() => currentQueryState?.value?.status);
  const data = computed(() => currentQueryState?.value?.data);
  const error = computed(() => currentQueryState?.value?.error);

  return {
    isLoading,
    status,
    data,
    error
  };
};

const createQuery = <T>({ queryHash, queryFunction }: QueryOptions) => {
  const query: Query<T> = {
    state: {
      data: null,
      error: null,
      status: Statuses.ERROR,
      isLoading: false,
      lastUpdated: null
    } as UseQueryState<T>,
    queryHash,
    subscribers: [],
    subscribe: (subscriber: Observer<T>) => {
      query.subscribers.push(subscriber);

      return () => {
        query.subscribers.filter(sub => sub !== subscriber);
      };
    },
    setState: (updater: (oldState: UseQueryState<T>) => UseQueryState<T>) => {
      query.state = updater(query.state);
      query.subscribers.forEach(subscriber => subscriber.notify());
    },
    getState: () => query.state,
    fetch: async () => {
      query.setState((old: UseQueryState<T>) => ({
        ...old,
        isLoading: true,
        status: Statuses.LOADING,
        error: ''
      }));

      try {
        const data = await queryFunction();

        query.setState((old: UseQueryState<T>) => ({
          ...old,
          data,
          status: Statuses.SUCCESS,
          lastUpdated: Date.now()
        }));
      } catch (error) {
        query.setState((old: UseQueryState<T>) => ({
          ...old,
          status: Statuses.ERROR,
          error: error as string
        }));
      } finally {
        query.setState((old: UseQueryState<T>) => ({
          ...old,
          isLoading: true
        }));
      }
    }
  };

  return query;
};

export const useIsLoading = (queryKey: string): boolean => {
  const isLoading = ref(false);

  onMounted(() => {
    isLoading.value = queryClient.getQueryByHash(queryKey)?.getState().isLoading || false;
  });

  watch(renderer, () => {
    isLoading.value = queryClient.getQueryByHash(queryKey)?.getState().isLoading || false;
  });

  return isLoading;
};

export default useQuery;
