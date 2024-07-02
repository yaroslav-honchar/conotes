import { Link } from "expo-router"

import type { ComponentProps } from "react"

export interface IRootLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string
}
