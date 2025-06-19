import type { MenuProps } from "antd/es/menu/menu";

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  onChange?: () => void,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick: onChange,
  } as MenuItem;
}
