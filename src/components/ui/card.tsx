import React from "react";
import classNames from "classnames";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={classNames("bg-white rounded-2xl shadow p-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
