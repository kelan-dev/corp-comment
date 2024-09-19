import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore";
import HashtagListItem from "./HashtagListItem";

export default function HashtagList() {
  const uniqueCompanyList = useFeedbackItemsStore((state) =>
    state.getCompanyList()
  );

  return (
    <ul className="hashtags">
      {uniqueCompanyList.map((company) => (
        <HashtagListItem key={company} company={company} />
      ))}
    </ul>
  );
}
