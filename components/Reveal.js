"use client";
import { useInView } from "./hooks";

// Wrapper that fades/slides content in when it scrolls into view
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, shown] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${shown ? "show" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
