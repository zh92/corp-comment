import { useState } from "react"
import { MAX_CHARACTERS } from "../lib/constants";


export default function FeedbackForm() {
    const [text, setText] = useState("");
    const charCount = MAX_CHARACTERS - text.length;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {{
        const newText = event.target.value;
        if (newText.length > MAX_CHARACTERS) {
            return;
        }
        setText(newText);
    }}

    return <form className="form">
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