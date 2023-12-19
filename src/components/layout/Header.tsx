import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

type HeaderProps = {
    handleAddList: (text: string) => void
}

export default function Header({ handleAddList }: HeaderProps) {
    return <header>
        <Pattern />
        <Logo />
        <PageHeading />
        <FeedbackForm onAddList={handleAddList} />
    </header>
}