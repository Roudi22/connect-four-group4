type Props = {
  winner: string;
  setWinner: (winner: string) => void;
  setShowPopup: (showPopup: boolean) => void;
};

const WinnerPopup = (props: Props) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
          <h1>{props.winner} wins!</h1>
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => {
              props.setWinner('');
              props.setShowPopup(true);
            }}
          >
            Start New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerPopup;
