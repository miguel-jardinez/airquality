export enum ResourcesStatus {
  // eslint-disable-next-line no-unused-vars
  LOADING = 'LOADING',
  // eslint-disable-next-line no-unused-vars
  ERROR = 'ERROR',
  // eslint-disable-next-line no-unused-vars
  SUCCESS = 'SUCCESS'
}

type Success<T> = {
  status: ResourcesStatus.SUCCESS,
  data: T
}

type Error = {
  status: ResourcesStatus.ERROR
  message: string
}

type Loading = {
  status: ResourcesStatus.LOADING
}

export type Resources<T> = Success<T> | Error | Loading
