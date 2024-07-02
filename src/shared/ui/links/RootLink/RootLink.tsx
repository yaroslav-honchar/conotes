import { Link } from "expo-router"

import React from "react"

import { IRootLinkProps } from "./RootLink.props"

export const RootLink: React.FC<IRootLinkProps> = ({ href, ...rest }) => (
  <Link
    href={href}
    {...rest}
  />
)
