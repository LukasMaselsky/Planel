/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ToolsImport } from './routes/tools'
import { Route as ThemesImport } from './routes/themes'
import { Route as OrganiseImport } from './routes/organise'
import { Route as ActivityImport } from './routes/activity'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ToolsRoute = ToolsImport.update({
  path: '/tools',
  getParentRoute: () => rootRoute,
} as any)

const ThemesRoute = ThemesImport.update({
  path: '/themes',
  getParentRoute: () => rootRoute,
} as any)

const OrganiseRoute = OrganiseImport.update({
  path: '/organise',
  getParentRoute: () => rootRoute,
} as any)

const ActivityRoute = ActivityImport.update({
  path: '/activity',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/activity': {
      preLoaderRoute: typeof ActivityImport
      parentRoute: typeof rootRoute
    }
    '/organise': {
      preLoaderRoute: typeof OrganiseImport
      parentRoute: typeof rootRoute
    }
    '/themes': {
      preLoaderRoute: typeof ThemesImport
      parentRoute: typeof rootRoute
    }
    '/tools': {
      preLoaderRoute: typeof ToolsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ActivityRoute,
  OrganiseRoute,
  ThemesRoute,
  ToolsRoute,
])

/* prettier-ignore-end */