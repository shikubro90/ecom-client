import Jumbotron from "../../components/cards/Jumbotron"
import UserMenu from "../../components/nav/UserMenu"
import { useAuth } from "../../context/auth"
const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name.toUpperCase()}`} subTitle="Dashboard" />

      <UserMenu/>

    </>
  )
}

export default Dashboard