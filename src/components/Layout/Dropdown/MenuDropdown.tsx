import { useEffect, useState } from "react";
import styles from "./MenuDropdown.module.scss";
import kebabImg from "@/assets/images/icons/ic_kebab.svg";
import useDeviceType from "@/hooks/useDeviceType";
import Dropdown from "./Dropdown";
import { MenuDropdownProps } from "@/types/UiTypes";

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  onOrderChange,
  items = [],
}) => {
  const { isMobile } = useDeviceType();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleOptionClick = (option: string) => {
    setSelectedItem(option);
    onOrderChange(option);
  };

  return (
    <div className={styles["droppdown-main"]}>
      <Dropdown
        trigger={
          <img className={styles["arrow"]} src={kebabImg} alt="메뉴 드롭다운" />
        }
        items={items}
        textDrop={!isMobile}
        onSelect={handleOptionClick}
        triggerClassName={styles.trigger}
        menuClassName={styles["menu"]}
        itemClassName={styles["menu-item"]}
      />
    </div>
  );
};

export default MenuDropdown;
