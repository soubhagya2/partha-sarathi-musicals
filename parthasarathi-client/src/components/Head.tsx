import { useEffect } from "react";

interface HeadProps {
  title?: string;
  description?: string;
}

export default function Head({ title, description }: HeadProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector(
        'meta[name="description"]',
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);

  return null;
}
