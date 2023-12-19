import { useState } from "react"
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
    onAddList: (text: string) => void;
}

export default function FeedbackForm({ onAddList }: FeedbackFormProps) {
    const [text, setText] = useState("");
    const charCount = MAX_CHARACTERS - text.length;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {{
        const newText = event.target.value;
        if (newText.length > MAX_CHARACTERS) {
            return;
        }
        setText(newText);
    }}

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddList(text);
        setText("");
    };

    return <form onSubmit={handleSubmit} className="form">
        <textarea
            value={text}
            onChange={handleChange} 
            id="feedback-textarea" 
            placeholder="" 
            spellCheck={false}/>

        <label htmlFor="feedback-textarea">
            Enter your feedback here, remember to #hashtag the company
        </label>
        
        <div>
            <p className="u-italic">{charCount}</p>
            <button>Submit</button>
        </div>
    </form>
}