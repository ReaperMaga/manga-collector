import React, { ReactNode } from "react";

interface BasicButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color: "success" | "danger" | "dark" | "dark-light" | "primary";
    children: ReactNode;
}

const BasicButton = ({ color, children, ...HTMLAttributes }: BasicButtonProps) => {
    const colors = {
        success: "text-white bg-green-700 hover:bg-green-600",
        primary: "text-white bg-blue-700 hover:bg-blue-600",
        danger: "text-white bg-red-700 hover:bg-red-500",
        dark: "text-white bg-zinc-700 hover:bg-zinc-600",
        "dark-light": "text-white bg-zinc-600 hover:bg-zinc-500",
    };

    const classes = [
        colors[color],
        "flex items-center space-x-3 py-2 px-4 rounded-md transition cursor-pointer",
        HTMLAttributes.className,
    ];

    return (
        <button {...HTMLAttributes} className={classes.join(" ")}>
            {children}
        </button>
    );
};

export default BasicButton;
