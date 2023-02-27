import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context.js/auth";
function Home() {

  const [auth] = useAuth()

  return (
    <>
      <Jumbotron title="Hello Dear Custommer" />
      <pre>
        {JSON.stringify(auth, null, 4)}
      </pre>
    </>
  );
}

export default Home;
