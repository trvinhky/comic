import { useEffect } from "react"

const Admin = () => {

  useEffect(() => {
    document.title = 'Admin'
  }, [])

  return (
    <>
      Admin
    </>
  )
}

export default Admin
  