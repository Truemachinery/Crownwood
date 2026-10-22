"use client";

import { useState } from "react";
import { Plus, Equal } from "lucide-react";
import styles from "./specialty.module.css";

export function MixGuide() {
  const [gallons, setGallons] = useState(4);
  const concentrate = gallons / 4;
  const water = gallons * 3 / 4;

  return (
    <div className={styles.mixGuide}>
      <label htmlFor="batch-size" className={styles.batchLabel}>Choose your batch size</label>
      <select id="batch-size" value={gallons} onChange={(event) => setGallons(Number(event.target.value))} className={styles.batchSelect}>
        {[1, 2, 4, 8].map((size) => <option key={size} value={size}>{size} gallon{size === 1 ? "" : "s"} of mixed product</option>)}
      </select>
      <div className={styles.mixEquation} aria-live="polite" aria-atomic="true">
        <div><span className={styles.mixNumber}>{concentrate}<small>gal</small></span><strong>YardBond concentrate</strong><span>{concentrate * 128} fl oz</span></div>
        <Plus aria-label="plus" />
        <div><span className={styles.mixNumber}>{water}<small>gal</small></span><strong>Water</strong><span>{water * 128} fl oz</span></div>
        <Equal aria-label="equals" />
        <div className={styles.mixTotal}><span className={styles.mixNumber}>{gallons}<small>gal</small></span><strong>Mixed product</strong><span>{gallons * 128} fl oz total</span></div>
      </div>
      <p className={styles.mixNote}>US gallons and US fluid ounces. Mix ratio: 1 part concentrate to 3 parts water. Mixed volume does not indicate square-foot coverage.</p>
    </div>
  );
}
