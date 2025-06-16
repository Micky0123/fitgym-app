import React, { useState } from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue);

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === TabsList) {
      return React.cloneElement(child as React.ReactElement<any>, { value, setValue });
    }
    if (child.type === TabsContent && child.props.value === value) {
      return child;
    }
    return null;
  });
}

interface TabsListProps {
  children: React.ReactElement<TabsTriggerProps>[] | React.ReactElement<TabsTriggerProps>;
  value: string;
  setValue: (value: string) => void;
}

export function TabsList({ children, value, setValue }: TabsListProps) {
  return (
    <div className="flex gap-2 mb-4">
      {React.Children.map(children, (child) =>
        React.isValidElement<TabsTriggerProps>(child)
          ? React.cloneElement(child, { active: child.props.value === value, onClick: () => setValue(child.props.value) })
          : child
      )}
    </div>
  );
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  active: boolean;
  onClick: () => void;
}

export function TabsTrigger({ children, active, onClick }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full ${
        active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
