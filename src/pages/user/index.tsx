import { useEffect } from "react"

const User = () => {

  useEffect(() => {
    document.title = 'Người Dùng'
  }, [])

  return (
    <>
      User
    </>
  )
}

export default User
  