import { FC } from "react";
import {
    CircularProgress,
    Button,
} from "@mui/material";

type ButtonProps = {
    text?: string;
    className?: string;
    loading?: boolean;
}

export const CustomButton: FC<ButtonProps> = ({
    text,
    className = "",
    loading = false,
}) => {
    return (
        <Button
            disabled={loading}
            className={`${loading ? "!bg-[rgb(37,141,243)] !text-yellow-400" : "!bg-[rgb(9,132,253)]"
                }  !w-[100%] h-[40px] !border-[0.5px] !border-[rgba(68,68,68,0.57)] !rounded-[4px] !text-[#FFF] text-[16px] font-[500] gap-y-[45px] ${className}`}
            type="submit"
        >
            <span className="hover:text-yellow-400">{text}</span>
            {loading && (
                <div className="flex items-center justify-center pl-[20px]">
                    <CircularProgress className="!text-yellow-400 !h-[20px] !w-[20px]" />
                </div>
            )}
        </Button>
    );
};
