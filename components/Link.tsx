import { PropsWithChildren } from 'react'

interface Props {
  href: string
  target?: string
  rel?: string
}

const Link = (props: PropsWithChildren<Props>) => {
  return (
    <a
      href={props.href}
      target={props.target || '_blank'}
      rel={props.rel || 'noopener noreferrer'}
      className="text-primary cursor-pointer"
    >
      {props.children}
    </a>
  )
}

export default Link
