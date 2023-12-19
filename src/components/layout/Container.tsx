import { TFeedbackItem } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
    isLoading: boolean;
    feedbackItems: TFeedbackItem[];
    errorMessage: string;
    handleAddList: (text: string) => void;
}

export default function Container({ feedbackItems, isLoading, 
    errorMessage, handleAddList }: ContainerProps) {
    return <main className="container">
        <Header handleAddList={handleAddList} />
        <FeedbackList feedbackItems={feedbackItems}
            isLoading={isLoading} 
            errorMessage={errorMessage}/>
    </main>
}