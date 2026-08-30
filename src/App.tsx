import { RotateLeft } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Tab,
  Tabs,
  ThemeProvider,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { DK64Item, DKBBanana, GameOptions } from "./classes";
import { Game, GameConfig } from "./components";
import { DKButton, DKRoomDialog } from "./inputs";
import { socket } from "./utils/socket";
import { theme } from "./utils/theme";
import { type GameType, type LastCollected } from "./utils/types";

const App = () => {
  const [roomCreateOpen, setRoomCreateOpen] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [lastCollected, setLastCollected] = useState<LastCollected | null>(
    null
  );

  const [game, setGame] = useState<GameType>("DKB");
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [goLabel, setGoLabel] = useState("");
  const [start, setStart] = useState(false);

  const joinRoomEmit = () => {
    socket.emit("join_room_client", roomName);
  };

  useEffect(() => {
    const updateLastItem = (
      item: DK64Item | DKBBanana,
      index: number,
      playerId: string
    ) => {
      setLastCollected({
        item,
        index,
        playerId
      });
    };

    const goEvent = () => {
      setStart(true);
    };

    socket.on("collected_server", updateLastItem);
    socket.on("start_server", goEvent);

    return () => {
      socket.off("collected_server", updateLastItem);
      socket.off("start_server", goEvent);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <img src="./img/squawks.png" height={50} width={50} />
        <Typography color="textPrimary" variant="h1">
          Squawksatoo
        </Typography>
        <img
          src="./img/squawks.png"
          height={50}
          width={50}
          style={{ transform: "scaleX(-1)" }}
        />
      </Card>

      {!start && (
        <>
          <DKRoomDialog
            open={roomCreateOpen}
            setOpen={setRoomCreateOpen}
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomName={roomName}
            setRoomName={setRoomName}
            setupAction={joinRoomEmit}
          />

          {playerName && roomName && (
            <span style={{ position: "absolute", top: "5rem", left: "10px" }}>
              <Typography color="textPrimary" variant="h2">
                Player: {playerName}
              </Typography>
              <Typography color="textPrimary" variant="h2">
                Room: {roomName}
              </Typography>
              <IconButton
                sx={{ color: "white", marginLeft: "-1rem" }}
                onClick={() => setRoomCreateOpen(true)}
              >
                <RotateLeft />
              </IconButton>
            </span>
          )}

          <Tabs
            centered
            value={game}
            onChange={(_, newValue) => setGame(newValue)}
          >
            <Tab label="DKB" value="DKB" />
            <Tab label="DK64" value="DK64" />
          </Tabs>

          <GameConfig
            currentGame={game}
            setOptions={setGameOptions}
            setGoLabel={setGoLabel}
          />

          <Box sx={{ textAlign: "center" }}>
            <DKButton
              label={goLabel}
              handleClick={() => {
                socket.emit("start_client", roomName);
                setStart(true);
              }}
            />
          </Box>
        </>
      )}
      {socket.connected && start && gameOptions && (
        <Game
          options={gameOptions}
          setOptions={setGameOptions}
          setStart={setStart}
          socket={socket}
          lastCollected={lastCollected}
          playerName={playerName}
          roomName={roomName}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
