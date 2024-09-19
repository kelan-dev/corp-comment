import FeedbackListItem from "./FeedbackListItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore";

export default function FeedbackList() {
  const error = useFeedbackItemsStore((state) => state.error);
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  );

  return (
    <ol className="feedback-list">
      {error && <ErrorMessage message={error} />}
      {isLoading && <Spinner />}
      {filteredFeedbackItems.map((item) => (
        <FeedbackListItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
