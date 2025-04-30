import {House} from "lucide-react";
const Header = () => {
    // TODO: Update the Options in the header.
    const header_options = [
        {opt: "Home", icn: <House />},
        {opt: "Home", icn: <House />},
        {opt: "Home", icn: <House />},
    ]
    return (
        <header className={"bg-blue-sec text-white p-2 font-poppins"}>
            <nav>
                <ul className={"flex items-center justify-center gap-8"}>
                    {
                        header_options.map((opt, index) => (
                            <li key={index} className={" rounded-sm hover:bg-blue-pri/30 p-3 flex gap-2 items-center justify-center cursor-pointer"}>
                                {opt.icn}
                                <span>{opt.opt}</span>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
};

export default Header;
