"use client";

import { Link } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import styles from "../app/page.module.css";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <div className={styles.navBar}>
      <Link href="/submit">
        <button
          className={styles.navBarButton}
          data-active={isActive("/submit")}
        >
          TRF
        </button>
      </Link>
      <Link href="/forms">
        <button
          className={styles.navBarButton}
          data-active={isActive("/forms")}
        >
          My Submissions
        </button>
      </Link>
      <Link href="/approvals">
        <button
          className={styles.navBarButton}
          data-active={isActive("/approvals")}
        >
          My Approvals
        </button>
      </Link>
    </div>
  );
}
