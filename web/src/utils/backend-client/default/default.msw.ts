/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Common Fate
 * Common Fate API
 * OpenAPI spec version: 1.0
 */
import {
  rest
} from 'msw'
import {
  faker
} from '@faker-js/faker'
import {
  LogLevel,
  IdpStatus
} from '.././types'

export const getAdminListTargetRoutesMock = () => ({routes: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({targetGroupId: faker.random.word(), handlerId: faker.random.word(), kind: faker.random.word(), priority: faker.datatype.number({min: undefined, max: undefined}), valid: faker.datatype.boolean(), diagnostics: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({level: faker.helpers.arrayElement(Object.values(LogLevel)), code: faker.random.word(), message: faker.random.word()}))})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserListEntitlementsMock = () => ({targetGroups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), schema: {
        'clglj3ofi000vfkon4uk50yq3': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement(['SELECT']), groups: {
        'clglj3ofi000ufkon6ii80z68': {id: faker.random.word(), title: faker.random.word(), description: faker.helpers.arrayElement([faker.random.word(), undefined])}
      }}
      }, from: {publisher: faker.random.word(), name: faker.random.word(), version: faker.random.word(), kind: faker.random.word()}, icon: faker.random.word(), createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserListEntitlementResourcesMock = () => ({resources: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({type: faker.random.word(), value: faker.random.word(), description: faker.random.word(), label: faker.random.word(), related: {}})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserListEntitlementTargetsMock = () => ({targets: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserListRequestsMock = () => ({requests: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), context: {purpose: {reason: faker.random.word()}, context: {ip: faker.random.word(), userAgent: faker.random.word()}, metadata: {createdAt: faker.random.word()}}, user: {id: faker.random.word(), email: faker.random.word(), firstName: faker.random.word(), picture: faker.random.word(), status: faker.helpers.arrayElement(Object.values(IdpStatus)), lastName: faker.random.word(), updatedAt: faker.random.word(), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, createdAt: faker.random.word(), updatedAt: faker.random.word()})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserRequestPreflightMock = () => ({targets: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
        'clglj3ofs000xfkonbayvful1': {id: faker.random.word(), title: faker.random.word(), resourceName: faker.helpers.arrayElement([faker.random.word(), undefined]), description: faker.helpers.arrayElement([faker.random.word(), undefined]), ruleFormElement: faker.helpers.arrayElement(['INPUT','MULTISELECT','SELECT']), requestFormElement: faker.helpers.arrayElement([faker.helpers.arrayElement(['SELECT']), undefined]), groups: faker.helpers.arrayElement([{
        'clglj3ofs000wfkondawx1i8t': {name: faker.random.word(), description: faker.random.word(), id: faker.random.word(), memberCount: faker.datatype.number({min: undefined, max: undefined}), members: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word())), source: faker.random.word()}
      }, undefined])}
      })), preflightId: faker.random.word()})

export const getUserGetRequestMock = () => ({id: faker.random.word(), context: {purpose: {reason: faker.random.word()}, context: {ip: faker.random.word(), userAgent: faker.random.word()}, metadata: {createdAt: faker.random.word()}}, user: {id: faker.random.word(), email: faker.random.word(), firstName: faker.random.word(), picture: faker.random.word(), status: faker.helpers.arrayElement(Object.values(IdpStatus)), lastName: faker.random.word(), updatedAt: faker.random.word(), groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => (faker.random.word()))}, createdAt: faker.random.word(), updatedAt: faker.random.word()})

export const getUserListRequestAccessGroupsMock = () => ({groups: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), accessRuleId: faker.random.word(), requestId: faker.random.word(), status: faker.random.word(), time: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, overrideTiming: {durationSeconds: faker.datatype.number({min: undefined, max: undefined}), startTime: faker.helpers.arrayElement([faker.random.word(), undefined])}, createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserGetRequestAccessGroupMock = () => ({id: faker.random.word(), accessRuleId: faker.random.word(), requestId: faker.random.word(), status: faker.random.word(), time: {maxDurationSeconds: faker.datatype.number({min: 60, max: 15724800})}, overrideTiming: {durationSeconds: faker.datatype.number({min: undefined, max: undefined}), startTime: faker.helpers.arrayElement([faker.random.word(), undefined])}, createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserListRequestAccessGroupGrantsMock = () => ({grants: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.random.word(), accessGroupId: faker.random.word(), status: faker.helpers.arrayElement(['PENDING','ACTIVE','REVOKED','EXPIRED','ERROR']), subject: faker.random.word(), target: {}, accessInstructions: faker.helpers.arrayElement([faker.random.word(), undefined]), start: `${faker.date.past().toISOString().split('.')[0]}Z`, end: `${faker.date.past().toISOString().split('.')[0]}Z`, createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})), next: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getUserGetRequestAccessGroupGrantMock = () => ({id: faker.random.word(), accessGroupId: faker.random.word(), status: faker.helpers.arrayElement(['PENDING','ACTIVE','REVOKED','EXPIRED','ERROR']), subject: faker.random.word(), target: {}, accessInstructions: faker.helpers.arrayElement([faker.random.word(), undefined]), start: `${faker.date.past().toISOString().split('.')[0]}Z`, end: `${faker.date.past().toISOString().split('.')[0]}Z`, createdAt: faker.helpers.arrayElement([faker.random.word(), undefined]), updatedAt: faker.helpers.arrayElement([faker.random.word(), undefined])})

export const getDefaultMSW = () => [
rest.get('*/api/v1/admin/target-groups/:id/routes', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getAdminListTargetRoutesMock()),
        )
      }),rest.get('*/api/v1/entitlements', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserListEntitlementsMock()),
        )
      }),rest.get('*/api/v1/entitlements/resources', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserListEntitlementResourcesMock()),
        )
      }),rest.get('*/api/v1/entitlements/targets', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserListEntitlementTargetsMock()),
        )
      }),rest.get('*/api/v1/requests', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserListRequestsMock()),
        )
      }),rest.post('*/api/v1/requests', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.post('*/api/v1/requests/preflight', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserRequestPreflightMock()),
        )
      }),rest.get('*/api/v1/requests/:requestId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserGetRequestMock()),
        )
      }),rest.get('*/api/v1/requests/:requestId/groups', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserListRequestAccessGroupsMock()),
        )
      }),rest.get('*/api/v1/requests/:requestId/groups/:groupId', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserGetRequestAccessGroupMock()),
        )
      }),rest.get('*/api/v1/groups/:groupId/grants', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserListRequestAccessGroupGrantsMock()),
        )
      }),rest.get('*/api/v1/groups/:gid/grants:grantid', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getUserGetRequestAccessGroupGrantMock()),
        )
      }),]
