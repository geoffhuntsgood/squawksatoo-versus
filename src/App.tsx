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
import { GameOptions } from "./classes";
import { Game, GameConfig } from "./components";
import { DKMessageOnlyDialog, DKRoomDialog, DKStartDialog } from "./dialogs";
import { DKButton } from "./inputs";
import { socket } from "./utils/socket";
import { theme } from "./utils/theme";
import { type GameType } from "./utils/types";

const App = () => {
  const [roomCreateOpen, setRoomCreateOpen] = useState(true);
  const [confirmStartOpen, setConfirmStartOpen] = useState(false);
  const [waitingOpen, setWaitingOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  const [currentGame, setCurrentGame] = useState<GameType>("DKB");
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [requestedOptions, setRequestedOptions] = useState<GameOptions | null>(
    null
  );
  const [goLabel, setGoLabel] = useState("");
  const [start, setStart] = useState(false);

  const makeStartRequest = () => {
    socket.emit("request_start_client", roomName, gameOptions);
    setWaitingOpen(true);
  };

  const denyStart = () => {
    socket.emit("deny_start_client", roomName);
    setConfirmStartOpen(false);
    setWaitingOpen(false);
  };

  const confirmStartRequest = () => {
    socket.emit("start_client", roomName);
    setGameOptions(requestedOptions);
    setWaitingOpen(false);
    setStart(true);
  };

  useEffect(() => {
    socket.on("set_game_server", (game: GameType) => setCurrentGame(game));
    socket.on("start_server", (players: string[]) => {
      setPlayers(players);
      setWaitingOpen(false);
      setStart(true);
    });
    socket.on("request_start_server", (options: GameOptions) => {
      setRequestedOptions(options);
      setConfirmStartOpen(true);
    });
    socket.on("deny_start_server", () => {
      setWaitingOpen(false);
      setConfirmStartOpen(false);
    });

    return () => {
      socket.off("set_game_server");
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
            setPlayerName={setPlayerName}
            setRoomName={setRoomName}
            socket={socket}
          />

          <DKMessageOnlyDialog
            open={waitingOpen}
            setOpen={setWaitingOpen}
            title="Waiting"
            message="Request to start sent! Waiting on other players..."
          />

          <DKStartDialog
            open={confirmStartOpen}
            setOpen={setConfirmStartOpen}
            currentGame={currentGame}
            requested={requestedOptions}
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
                ↩
              </IconButton>
            </span>
          )}

          <Tabs
            centered
            value={currentGame}
            onChange={(_, newValue) => {
              socket.emit("set_game_client", roomName, newValue);
              setCurrentGame(newValue);
            }}
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
            <DKButton label={goLabel} handleClick={makeStartRequest} />
          </Box>
        </>
      )}

      {socket.connected && start && gameOptions && (
        <Game
          options={gameOptions}
          setOptions={setGameOptions}
          setStart={setStart}
          socket={socket}
          playerName={playerName}
          roomName={roomName}
          players={players}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
