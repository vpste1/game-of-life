import { useState } from "react";
import styles from "./cell.module.css";

export const Cell = () => {
	const [isActive, setIsActive] = useState(false);
	return (
		<span
			draggable={false}
			onMouseEnter={(event) => {
				event.buttons === 1 && setIsActive(!isActive);
			}}
			onMouseDown={() => setIsActive(!isActive)}
			className={`${isActive ? styles["active"] : styles["inactive"]}
                  ${styles.cell}`}
		/>
	);
};
