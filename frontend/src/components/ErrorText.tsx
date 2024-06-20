import InfoIcon from "@mui/icons-material/Info";
import { FC } from "react";

type ErrorTextProps = {
    text: string;
};

const ErrorText: FC<ErrorTextProps> = ({ text }) => {
    return (
        <div className="!h-[20px] !text-[10px] font-[600] flex items-center text-[#e13434] pt-[4px] ">
            {text && (
                <>
                    <InfoIcon className="!text-[15px] pr-[4px]" />
                    {text}
                </>
            )}
        </div>
    );
};

export default ErrorText;
