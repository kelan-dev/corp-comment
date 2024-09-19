import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore";

type HashtagListItemProps = {
  company: string;
};

export default function HashtagListItem({ company }: HashtagListItemProps) {
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);
  return (
    <li key={company}>
      <button onClick={() => selectCompany(company)}>#{company}</button>
    </li>
  );
}
