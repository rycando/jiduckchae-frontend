import React from 'react'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const options = [
    
]

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
            <SubMenu title={<span>Uploads</span>}>
                <Menu.Item key="mail">
                    <a href="/upload">Upload</a>
                </Menu.Item>
                <Menu.Item key="mail">
                    <a href="/uploadEnt">EntUpload</a>
                </Menu.Item>
                <Menu.Item key="mail">
                    <a href="/uploadArtist">ArtistUpload</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default LeftMenu
