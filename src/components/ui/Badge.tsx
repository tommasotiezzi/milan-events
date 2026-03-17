interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sponsored" | "rsvp" | "category";
  className?: string;
}

const variantClasses = {
  default: "bg-gray-100 text-gray-700",
  sponsored: "bg-amber-100 text-amber-800",
  rsvp: "bg-purple-100 text-purple-800",
  category: "bg-blue-100 text-blue-800",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
