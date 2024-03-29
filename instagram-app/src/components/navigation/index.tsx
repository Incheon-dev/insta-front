import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;
export type navType = {
    title: string;
    icons?: string;
    onClick:()=>void;
};
interface Props {
    navList: navType[];
    window?: () => Window;
    useMenus?: boolean;
}

export default function ResponsiveDrawer(props: Props) {
    const navigate = useNavigate();

    const drawer = (
        <div>
            <List>
                {props.navList.map((nav: navType, index: number) => {
                    return (
                        <ListItem key={nav.title} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                   nav.onClick();
                                }}
                            >
                                {/* <ListItemIcon></ListItemIcon> */}
                                <ListItemText primary={nav.title} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex", zIndex: 10 }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
