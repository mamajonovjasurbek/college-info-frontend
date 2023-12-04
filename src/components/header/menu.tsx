
import { NavLink } from 'react-router-dom';
import { memo, useState } from 'react';
import ExitModal from '../modals/exitModal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdbOutlinedIcon from '@mui/icons-material/AdbOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
export const MenuComponent = memo(() => {
    const [exit, setExit] = useState(false);

    return (
        <header className="pt-5 pb-5 bg-dark-bg-meddium w-[5%]">
                <div  className="h-full flex flex-col justify-between p-4">
                    <div className="flex flex-col items-center gap-6">
                        <AdbOutlinedIcon
                            sx={{ color: '#fff', fontSize : 60, padding: "4px" , borderRadius : "10px" , "&:hover": {
                                    backgroundColor: "#565EE2",
                                    color: '#fff'
                                } }}
                        />
                        <NavLink to={'/home'}>  <HomeOutlinedIcon
                            sx={{ color: '#fff', fontSize : 60, padding: "4px" , borderRadius : "10px" , "&:hover": {
                                    backgroundColor: "#565EE2",
                                    color: '#fff'
                                } }}
                        /></NavLink>
                        <NavLink to={'/home/admin'}><AdminPanelSettingsOutlinedIcon
                            sx={{ color: '#fff', fontSize : 60, padding: "4px" , borderRadius : "10px" , "&:hover": {
                                    backgroundColor: "#565EE2",
                                    color: '#fff'
                                } }}
                        /></NavLink>
                    </div>

                    <div
                    >
                            <ExitToAppIcon
                                sx={{ color: '#fff', fontSize : 60, padding: "4px" , borderRadius : "10px" , "&:hover": {
                                        backgroundColor: "#565EE2",
                                        color: '#fff'
                                    } }}/>
                    </div>
                </div>
            {exit && (
                <ExitModal
                    show={exit}
                    showHandler={setExit}
                />
            )}
        </header>
    );
});
