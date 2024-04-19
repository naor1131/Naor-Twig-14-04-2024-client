import "./score-board.css";

interface IScoreBoardProps {
  score: number;
  title: string;
  color: string;
}

const ScoreBoard = ({ score, title, color }: IScoreBoardProps) => {
  return (
    <div className="score-board">
      <div className="title">{title}</div>
      <div className="score" style={{ color }}>
        {score}
      </div>
    </div>
  );
};

export default ScoreBoard;
