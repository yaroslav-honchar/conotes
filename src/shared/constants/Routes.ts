const RoutesConstants = {
  Home: "/",
  Login: "/auth/login",
  Register: "/auth/register",
}

type TRouteKeys = keyof typeof RoutesConstants

export const Routes = Object.assign(RoutesConstants, {
  getPathForRoot: function (key: TRouteKeys): string {
    if (key === "Home") {
      return "index"
    }

    return RoutesConstants[key].replace(/^\//, "")
  },
})
