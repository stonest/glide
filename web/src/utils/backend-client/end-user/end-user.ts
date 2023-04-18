/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Common Fate
 * Common Fate API
 * OpenAPI spec version: 1.0
 */
import useSwr from 'swr'
import type {
  SWRConfiguration,
  Key
} from 'swr'
import type {
  ReviewResponseResponse,
  ReviewRequestBody,
  ErrorResponseResponse,
  User,
  AuthUserResponseResponse,
  ListFavoritesResponseResponse,
  FavoriteDetail,
  CreateFavoriteRequestBody,
  ListRequests2ResponseResponse,
  UserListRequestsUpcomingParams,
  UserListRequestsPastParams
} from '.././types'
import { customInstance } from '../../custom-instance'
import type { ErrorType } from '../../custom-instance'


  
  // eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

/**
 * Review an access request made by a user. The reviewing user must be an approver for a request. Users cannot review their own requests, even if they are an approver for the Access Rule.
 * @summary Review a request
 */
export const userReviewRequest = (
    requestId: string,
    reviewRequestBody: ReviewRequestBody,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<ReviewResponseResponse>(
      {url: `/api/v1/requests/${requestId}/review`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: reviewRequestBody
    },
      options);
    }
  

/**
 * Admins and approvers can revoke access previously approved. Effective immediately 
 * @summary Revoke an active request
 */
export const userRevokeRequest = (
    requestid: string,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<void>(
      {url: `/api/v1/requests/${requestid}/revoke`, method: 'post'
    },
      options);
    }
  

/**
 * Returns a Common Fate user.
 * @summary Get a user
 */
export const userGetUser = (
    userId: string,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<User>(
      {url: `/api/v1/users/${userId}`, method: 'get'
    },
      options);
    }
  

export const getUserGetUserKey = (userId: string,) => [`/api/v1/users/${userId}`];

    
export type UserGetUserQueryResult = NonNullable<Awaited<ReturnType<typeof userGetUser>>>
export type UserGetUserQueryError = ErrorType<void>

export const useUserGetUser = <TError = ErrorType<void>>(
 userId: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof userGetUser>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstance> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(userId)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getUserGetUserKey(userId) : null);
  const swrFn = () => userGetUser(userId, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Returns information about the currently logged in user.
 * @summary Get details for the current user
 */
export const userGetMe = (
    
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<AuthUserResponseResponse>(
      {url: `/api/v1/users/me`, method: 'get'
    },
      options);
    }
  

export const getUserGetMeKey = () => [`/api/v1/users/me`];

    
export type UserGetMeQueryResult = NonNullable<Awaited<ReturnType<typeof userGetMe>>>
export type UserGetMeQueryError = ErrorType<void>

export const useUserGetMe = <TError = ErrorType<void>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof userGetMe>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstance> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getUserGetMeKey() : null);
  const swrFn = () => userGetMe(requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Returns a list of the user's favourited access requests. 
 * @summary ListFavorites
 */
export const userListFavorites = (
    
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<ListFavoritesResponseResponse>(
      {url: `/api/v1/favorites`, method: 'get'
    },
      options);
    }
  

export const getUserListFavoritesKey = () => [`/api/v1/favorites`];

    
export type UserListFavoritesQueryResult = NonNullable<Awaited<ReturnType<typeof userListFavorites>>>
export type UserListFavoritesQueryError = ErrorType<ErrorResponseResponse>

export const useUserListFavorites = <TError = ErrorType<ErrorResponseResponse>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof userListFavorites>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstance> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getUserListFavoritesKey() : null);
  const swrFn = () => userListFavorites(requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Favorites an access request for a given user. This is used for frequent access requests saving time and repeated actions. 
 * @summary Create Favorite
 */
export const userCreateFavorite = (
    createFavoriteRequestBody: CreateFavoriteRequestBody,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<FavoriteDetail>(
      {url: `/api/v1/favorites`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createFavoriteRequestBody
    },
      options);
    }
  

/**
 * Returns a detailed favorite response. This is used to display a favorite's details on the frontend. 
 * @summary Get Favorite
 */
export const userGetFavorite = (
    id: string,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<FavoriteDetail>(
      {url: `/api/v1/favorites/${id}`, method: 'get'
    },
      options);
    }
  

export const getUserGetFavoriteKey = (id: string,) => [`/api/v1/favorites/${id}`];

    
export type UserGetFavoriteQueryResult = NonNullable<Awaited<ReturnType<typeof userGetFavorite>>>
export type UserGetFavoriteQueryError = ErrorType<ErrorResponseResponse>

export const useUserGetFavorite = <TError = ErrorType<ErrorResponseResponse>>(
 id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof userGetFavorite>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstance> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getUserGetFavoriteKey(id) : null);
  const swrFn = () => userGetFavorite(id, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Delete a saved favorite
 */
export const userDeleteFavorite = (
    id: string,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<void>(
      {url: `/api/v1/favorites/${id}`, method: 'delete'
    },
      options);
    }
  

/**
 * Update a favorite with new FavoriteDetails
 */
export const userUpdateFavorite = (
    id: string,
    createFavoriteRequestBody: CreateFavoriteRequestBody,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<FavoriteDetail>(
      {url: `/api/v1/favorites/${id}`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: createFavoriteRequestBody
    },
      options);
    }
  

/**
 * Display pending requests and approved requests that are currently active or scheduled to begin some time in future.
 * @summary Your GET endpoint
 */
export const userListRequestsUpcoming = (
    params?: UserListRequestsUpcomingParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<ListRequests2ResponseResponse>(
      {url: `/api/v1/requests/upcoming`, method: 'get',
        params
    },
      options);
    }
  

export const getUserListRequestsUpcomingKey = (params?: UserListRequestsUpcomingParams,) => [`/api/v1/requests/upcoming`, ...(params ? [params]: [])];

    
export type UserListRequestsUpcomingQueryResult = NonNullable<Awaited<ReturnType<typeof userListRequestsUpcoming>>>
export type UserListRequestsUpcomingQueryError = ErrorType<unknown>

export const useUserListRequestsUpcoming = <TError = ErrorType<unknown>>(
 params?: UserListRequestsUpcomingParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof userListRequestsUpcoming>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstance> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getUserListRequestsUpcomingKey(params) : null);
  const swrFn = () => userListRequestsUpcoming(params, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Display show cancelled, expired, and revoked requests.

 * @summary Your GET endpoint
 */
export const userListRequestsPast = (
    params?: UserListRequestsPastParams,
 options?: SecondParameter<typeof customInstance>) => {
      return customInstance<ListRequests2ResponseResponse>(
      {url: `/api/v1/requests/past`, method: 'get',
        params
    },
      options);
    }
  

export const getUserListRequestsPastKey = (params?: UserListRequestsPastParams,) => [`/api/v1/requests/past`, ...(params ? [params]: [])];

    
export type UserListRequestsPastQueryResult = NonNullable<Awaited<ReturnType<typeof userListRequestsPast>>>
export type UserListRequestsPastQueryError = ErrorType<unknown>

export const useUserListRequestsPast = <TError = ErrorType<unknown>>(
 params?: UserListRequestsPastParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof userListRequestsPast>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof customInstance> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getUserListRequestsPastKey(params) : null);
  const swrFn = () => userListRequestsPast(params, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

