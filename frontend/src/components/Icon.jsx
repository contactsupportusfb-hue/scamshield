export default function Icon({ name, className = '', fill = false, style, ...rest }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${fill ? 'icon-fill' : ''} ${className}`} style={style} {...rest}>
      {name}
    </span>
  )
}
