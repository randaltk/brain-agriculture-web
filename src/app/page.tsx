"use client";


import Dashboard from "@/components/dashboard/Dashboard";
import "./globals.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Brain Agriculture - Dashboards</h1>
      </div>

      <Dashboard />
    </main>
  );
}
