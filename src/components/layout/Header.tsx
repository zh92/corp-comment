import { useFeedbackItemsContext } from "../../lib/hooks";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
    const { handleAddList } = useFeedbackItemsContext();
    
    return <header>
        <Pattern />
        <Logo />
        <PageHeading />
        <FeedbackForm onAddList={handleAddList} />
    </header>
}