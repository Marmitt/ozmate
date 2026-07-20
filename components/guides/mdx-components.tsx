import type { AnchorHTMLAttributes, ComponentPropsWithoutRef } from "react";
import { Callout } from "@/components/guides/Callout";

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = props.href?.startsWith("http");
  return (
    <a
      {...props}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    />
  );
}

export const mdxComponents = {
  a: MdxLink,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className="mt-8 text-xl font-bold text-ink" />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className="mt-6 text-lg font-semibold text-ink" />
  ),
  Callout,
};
