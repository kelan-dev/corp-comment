import { useState } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/types";

type FeedbackListItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackListItem({
  feedbackItem,
}: FeedbackListItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.currentTarget.disabled = true;
    setUpvoteCount((count) => ++count);
  };

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : ""}`}
      onClick={() => setOpen((open) => !open)}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "New" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
