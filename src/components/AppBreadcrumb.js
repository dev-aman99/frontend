import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  
  const getRouteName = (pathname, routes) => {
    for (const route of routes) {
      const routeSegments = route.path.split('/').filter(Boolean)
      const pathnameSegments = pathname.split('/').filter(Boolean)
      
      if (routeSegments.length !== pathnameSegments.length) continue
      
      let match = true
      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) continue
        if (routeSegments[i] !== pathnameSegments[i]) {
          match = false
          break
        }
      }
      
      if (match) return route.name
    }
    return false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem>
        <Link to="/">Home</Link>
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <CBreadcrumbItem key={index} active={breadcrumb.active}>
          {breadcrumb.active ? (
            breadcrumb.name
          ) : (
            <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
          )}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
