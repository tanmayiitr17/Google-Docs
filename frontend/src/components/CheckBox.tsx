import { Checkbox } from "@mui/material";

const CheckBox = ({
    fieldName = "",
}: {
    fieldName?: string;
}) => {

    return (
        <div className="ml-[-10px] text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            <Checkbox className="!mb-[4px]" /><span className="text-[#000] text-[14px] font-[500] leading-[22px]">{fieldName}</span>
        </div>
    );
};

export default CheckBox;
