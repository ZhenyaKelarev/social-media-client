import * as React from "react"
import { Dropdown } from "@mui/base/Dropdown"
import { Menu } from "@mui/base/Menu"
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton"
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { styled } from "@mui/system"
import "./styles.scss"

export default function MenuSimple({ items }) {
  return (
    <Dropdown>
      <MenuButton>
        <div className="icon">
          <MoreVertIcon />
        </div>
      </MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {items.map((item) => {
          return <MenuItem onClick={item.handler}>{item.text}</MenuItem>
        })}
      </Menu>
    </Dropdown>
  )
}

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #DAE2ED;
  color: #1C2025;
  box-shadow: 0px 4px 6px rgba(0,0,0, 0.05);
  z-index: 1;
  `
)

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    background-color: #E5EAF2;
    color: #1C2025;
  }

  `
)

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  padding: 8px 20px 0 10px;
  transition: all 150ms ease;
	border: none;
	background: transparent;
  cursor: pointer;
  `
)
