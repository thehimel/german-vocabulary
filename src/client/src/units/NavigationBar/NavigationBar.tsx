import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {ThemeSwitcher} from "../Theme/ThemeSwitcher.tsx";
import SearchBar from "./SearchBar.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import {NavLink} from "react-router-dom";
import {AcmeLogo} from "./AcmeLogo.tsx";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const darkMode = useAppSelector((state) => state.base.darkMode);

  const menuItems = [
    "Profile",
    "Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="gap-4" justify="center">
        <NavLink to="/">
          <NavbarBrand>
            <AcmeLogo />
            <p className="hidden md:flex font-bold text-inherit">Vocabulary</p>
          </NavbarBrand>
        </NavLink>

        {/*
          <NavbarItem className="hidden md:flex" isActive>
            <NavLink to="/">
              Home
            </NavLink>
          </NavbarItem>
        */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <SearchBar key="end"/>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="secondary" href="/accounts/signup/" variant="light">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="secondary" href="/accounts/login/" variant="flat">
            Login
          </Button>
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitcher/>
        </NavbarItem>

        <NavbarMenuToggle className="sm:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarMenu className={`${darkMode ? 'dark' : ''}`}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 1 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavigationBar;
