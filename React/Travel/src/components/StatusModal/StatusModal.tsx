import { Button } from "../Button";
import styles from "./StatusModal.module.scss";
import IconClose from "../../assets/images/svg/icon-close.svg?react";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";

export const StatusModal = (data: { title: string }) => {
  const [, setSearchParams] = useSearchParams();

  const handleCloseModal = () => {
    setSearchParams({});
  };

  return (
    <div className={styles.statusModal}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className={styles.statusModal__modal}>
            <p className={styles.statusModal__modalTitle}>{data.title}</p>
            <div className={styles.statusModal__modalBtn}>
              <Button
                title={<IconClose className={styles.statusModal__modalSvg} />}
                variant="linkBlack"
                size="none"
                isDisable={false}
                isLoading={false}
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StatusModal;
