import Jumbotron from "../../components/cards/Jumbotron"
import UserMenu from "../../components/nav/UserMenu"
import { useAuth } from "../../context/auth"
import UserProfile from "./UserProfile"
const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <>
     <div>
      <Jumbotron title={auth?.user.name.toUpperCase()} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
              <UserProfile/>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Dashboard