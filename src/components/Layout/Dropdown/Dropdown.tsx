import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import useClickOutside from "@/hooks/useClickOutside";
import { DropdownProps } from "@/types/UiTypes";

const Dropdown: React.FC<DropdownProps> = ({
  trigger = <></>,
  items = [],
  children = null,
  onSelect = () => {},
  textDrop = true,
  triggerClassName = "",
  menuClassName = "",
  itemClassName = "",
  onToggle = () => {},
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<string>(
    typeof trigger === "string" ? trigger : ""
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
    onToggle(false);
  };

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    onToggle(false);
  });

  const renderTrigger = () => {
    if (typeof trigger === "string") {
      return <>{selectedItem}</>;
    } else if (React.isValidElement(trigger))
      return React.cloneElement(trigger);
  };

  useEffect(() => {}, [trigger]);

  return (
    <div className={styles.dropdown} ref={dropdownRef} {...rest}>
      <div
        className={`${styles.trigger} ${triggerClassName}`}
        onClick={handleToggle}
      >
        {renderTrigger()}
      </div>
      {isOpen && (
        <ul className={`${styles.menu} ${menuClassName}`}>
          {items.length !== 0
            ? items.map((item, index) => (
                <div key={item}>
                  <li
                    className={`${styles["menu-item"]} ${itemClassName}`}
                    key={index}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </li>
                  {index < items.length - 1 && (
                    <span className={styles.divider}></span>
                  )}
                </div>
              ))
            : children}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
