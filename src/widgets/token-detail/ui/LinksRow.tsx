import type { TokenLinks } from "@/entities/token";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, MessageCircleIcon, TwitterIcon } from "@/shared/ui/icons";
import styles from "./LinksRow.module.css";

const LINK_META = [
  { key: "homepage", label: "Website", Icon: GlobeIcon },
  { key: "explorer", label: "Explorer", Icon: ExternalLinkIcon },
  { key: "twitter", label: "Twitter", Icon: TwitterIcon },
  { key: "github", label: "GitHub", Icon: GithubIcon },
  { key: "reddit", label: "Reddit", Icon: MessageCircleIcon },
] as const;

export function LinksRow({ links }: { links: TokenLinks }) {
  const available = LINK_META.filter((item) => links[item.key]);
  if (available.length === 0) return null;

  return (
    <div className={styles.list}>
      {available.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={links[key] ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.row}
        >
          <span className={styles.rowLeft}>
            <Icon size={15} />
            {label}
          </span>
          <ExternalLinkIcon size={13} className={styles.rowArrow} />
        </a>
      ))}
    </div>
  );
}
