interface Props {
  textClassName?: string
  logoClassName?: string
}

const Logo = ({ textClassName, logoClassName }: Props) => {
  return (
    <div className="flex items-center gap-1.5">
      <img src="/logo.svg" className={logoClassName} alt="Verdko Logo" />
      <a href="/" className={`${textClassName} text-primary font-bold font-geist flex items-center`}>Verdko</a>
    </div>
  )
}

export default Logo