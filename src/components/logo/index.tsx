import { Link } from 'react-router-dom'
import './index.scss'

type logoSize = {
  size?: string
}

const Logo = (props: logoSize) => {

  return (
    <span id='logo' style={{
      fontSize: props.size || '45px'
    }}>
      <Link to="/" className='logo-text'>
        CommicQQ
      </Link>
    </span>
  )
}

export default Logo
