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
import { DKRoomDialog, DKStartDialog } from "./dialogs";
import { DKButton } from "./inputs";
import { socket } from "./utils/socket";
import { theme } from "./utils/theme";
import { type GameType, type LastCollected } from "./utils/types";

const App = () => {
  const [roomCreateOpen, setRoomCreateOpen] = useState(true);
  const [confirmStartOpen, setRequestStartOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [lastCollected, setLastCollected] = useState<LastCollected | null>(
    null
  );

  const [currentGame, setCurrentGame] = useState<GameType>("DKB");
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [requestedOptions, setRequestedOptions] = useState<GameOptions | null>(null);
  const [goLabel, setGoLabel] = useState("");
  const [start, setStart] = useState(false);

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

  const makeStartRequest = () => {
    socket.emit("request_start_client", roomName, gameOptions);
  };

  const denyStart = () => {
    setRequestStartOpen(false);
    socket.emit("deny_start_client", roomName);
  };

  const confirmStartRequest = () => {
    socket.emit("start_client", roomName);
    setGameOptions(requestedOptions);
    setStart(true);
  };

  useEffect(() => {
    socket.on("collected_server", updateLastItem);
    socket.on("start_server", () => setStart(true));
    socket.on("request_start_server", (options: GameOptions) => {
      setRequestedOptions(options);
      setRequestStartOpen(true)
    });
    socket.on("deny_start_server", () => setRequestStartOpen(false));

    return () => {
      socket.off("collected_server");
      socket.off("start_server");
      socket.off("request_start_server");
      socket.off("deny_start_server");
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <img src="./img/angy-squawks.png" height={50} width={50} />
        <Typography color="textPrimary" variant="h1">
          Squawksatoo <i>VS</i>
        </Typography>
        <img
          src="./img/angy-squawks.png"
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
            onCloseAction={() => {
              socket.emit("join_room_client", roomName);
            }}
          />

          <DKStartDialog
            open={confirmStartOpen}
            setOpen={setRequestStartOpen}
            currentGame={currentGame}
            requestedOptions={requestedOptions}
            onAcceptAction={confirmStartRequest}
            onDenyAction={denyStart}
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
            value={currentGame}
            onChange={(_, newValue) => setCurrentGame(newValue)}
          >
            <Tab label="DKB" value="DKB" />
            <Tab label="DK64" value="DK64" />
          </Tabs>

          <GameConfig
            currentGame={currentGame}
            setOptions={setGameOptions}
            setGoLabel={setGoLabel}
          />

          <Box sx={{ textAlign: "center" }}>
            <DKButton
              label={goLabel}
              handleClick={makeStartRequest}
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
          setLastCollected={setLastCollected}
          playerName={playerName}
          roomName={roomName}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
