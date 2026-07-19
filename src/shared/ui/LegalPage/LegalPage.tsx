import Link from "next/link";
import { ArrowLeftIcon } from "@/shared/ui/icons";
import styles from "./LegalPage.module.css";

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className={`container ${styles.wrap}`}>
      <div className={styles.col}>
        <Link href="/" className={styles.back}>
          <ArrowLeftIcon size={16} />
          Back to Swap
        </Link>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated: {updated}</p>
        <p className={styles.intro}>{intro}</p>

        {sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
