import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericLoadingPage from "../components/GenericLoadingPage";
import AuthContext from "../contexts/AuthContext";
import { getPlayerById } from "../services/playerService";
import { Player } from "../types";

const PlayerProfile = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const { token } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [ loading, setLoading] = useState<boolean>(true)
  const Navigate = useNavigate();

  useEffect(() => {
    if (token.length === 0) return Navigate("/");
    if (!id) return Navigate("/dashboard/all-players");
    
    const fetchPlayerData = async() => {
      try {
        const player = await getPlayerById(id, token);
        setPlayer(player);
        setLoading(false)
      } catch (error) {
        console.log("error", error);
      }

    }

    fetchPlayerData();
  }, [])



  if(loading || !player) return <GenericLoadingPage />

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 style={{margin: 0}}>{player.discordDisplayName}</h1>
        <h3 style={{margin: 0}}>{player.discordId}</h3>
        
      </div>
    </div>
  );
};

export default PlayerProfile;
