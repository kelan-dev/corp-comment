import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const charactersRemaining = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check for company hashtag
    const hashtag = text.split(" ").find((word) => word.startsWith("#"));
    if (hashtag) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
      return;
    }

    onAddToList(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator && "form--valid"} ${
        showInvalidIndicator && "form--invalid"
      }`}
    >
      <textarea
        id="feedback-textarea"
        value={text}
        onChange={handleChange}
        placeholder=""
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here. Remember to #hashtag the company!
      </label>
      <div>
        <p className="u-italic">{charactersRemaining}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
